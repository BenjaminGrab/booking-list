import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  setEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { computed, inject } from '@angular/core';
import { BookingService } from './booking.service';
import { lastValueFrom } from 'rxjs';
import { Booking, BookingCategory, BookingFilter } from '../models';
import { withFilter } from './filter.feature';
import { withOrder } from './order.feature';
import { orderBy } from 'lodash';
import { formatCurrency, formatDate } from '@angular/common';
import { withLoading } from './loading-feature';

export const BookingStore = signalStore(
  { providedIn: 'root' },
  withEntities<Booking>(),
  withFilter<BookingFilter>(),
  withOrder<Booking>(),
  withLoading(),
  withComputed(({ entities, order, filter }) => ({
    bookingsCount: computed(() =>
      entities().reduce(
        (acc, curr) => {
          acc.set(curr.category, (acc.get(curr.category) || 0) + 1);
          return acc;
        },
        new Map<string, number>([['all', entities().length]]),
      ),
    ),
    bookings: computed(() =>
      orderBy(
        entities().filter((item) => {
          const category = filter().category;
          const search = filter().search;
          return (
            (category === 'all' || item.category === category) &&
            (!search ||
              (Object.keys(item) as Array<keyof Booking>).some((key) => {
                const formatValue = (
                  key: keyof Booking,
                  value: string | number,
                ) => {
                  switch (key) {
                    case 'date':
                      return formatDate(value, 'dd.MM.YYY', 'de-DE');
                    case 'amount':
                      return formatCurrency(value as number, 'de-DE', 'EUR');
                    default:
                      return value.toString();
                  }
                };
                return (
                  key !== 'category' &&
                  formatValue(key, item[key])
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
              }))
          );
        }),
        order().property,
        order().direction,
      ),
    ),
  })),
  withMethods((store) => {
    const bookingsService = inject(BookingService);

    return {
      async loadBookings() {
        store.setLoading(true);
        const response = await lastValueFrom(bookingsService.getBookings());
        patchState(store, setEntities(response));
        store.setLoading(false);
      },
      async updateBooking(id: string, category: BookingCategory) {
        patchState(store, updateEntity({ id, changes: { category } }));
      },
    };
  }),
  withHooks({
    onInit({ loadBookings, setOrder, setFilter }) {
      loadBookings();
      setOrder({ property: 'date', direction: 'desc' });
      setFilter({ category: 'all' });
    },
  }),
);
