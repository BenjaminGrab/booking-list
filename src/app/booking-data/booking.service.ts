import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  httpClient = inject(HttpClient);

  getBookings(): Observable<Booking[]> {
    return (
      this.httpClient.get('/mock-bookings.json') as Observable<Booking[]>
    ).pipe(delay(400));
  }
}
