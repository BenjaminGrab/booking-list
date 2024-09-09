import { Component, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BookingStore } from '../booking-data/booking.store';
import { Booking, bookingCategories, BookingCategory } from '../models';
import { CategoryNamePipe } from '../category-name.pipe';

@Component({
  selector: 'app-booking-list-item',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    MatSelect,
    MatOption,
    MatFormField,
    FormsModule,
    CategoryNamePipe,
  ],
  templateUrl: './booking-list-item.component.html',
  styleUrl: './booking-list-item.component.scss',
})
export class BookingListItemComponent {
  private store = inject(BookingStore);

  public booking = input<Booking>();

  public categories = bookingCategories;

  updateBooking(category: BookingCategory) {
    this.store.updateBooking(this.booking()!.id, category);
  }
}
