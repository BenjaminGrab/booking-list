import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SortOrder } from '../models';

export type OrderState<T> = { order: SortOrder<T> };

export function withOrder<T>() {
  return signalStoreFeature(
    withState<OrderState<T>>({
      order: { property: '' as keyof T, direction: 'desc' },
    }),
    withMethods((store) => ({
      setOrder(order: SortOrder<T>) {
        patchState(store, { order });
      },
    })),
  );
}
