import { Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BookingListItemComponent } from '../booking-list-item/booking-list-item.component';
import { Booking } from '../models';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [AsyncPipe, BookingListItemComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss',
})
export class BookingListComponent {
  bookings = input<Booking[]>([]);
}
