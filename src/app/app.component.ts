import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingListComponent } from './booking-list/booking-list.component';
import { debounceTime } from 'rxjs';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {
  CdkMenu,
  CdkMenuItem,
  CdkMenuItemRadio,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import {
  Booking,
  bookingCategories,
  BookingCategory,
  SortOrder,
} from './models';
import { BookingStore } from './booking-data/booking.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryNamePipe } from './category-name.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BookingListComponent,
    MatChipListbox,
    MatChipOption,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIcon,
    MatSuffix,
    MatIconButton,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    CdkMenuItemRadio,
    CategoryNamePipe,
    MatProgressSpinner,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  public store = inject(BookingStore);
  public searchFormControl = new FormControl<string>('', { nonNullable: true });
  public filterCategories: BookingCategory[] = ['all', ...bookingCategories];

  public sortMenuItems: {
    id: number;
    text: string;
    order: SortOrder<Booking>;
  }[] = [
    {
      id: 1,
      text: 'Datum absteigend',
      order: { property: 'date', direction: 'desc' },
    },
    {
      id: 2,
      text: 'Datum aufsteigend',
      order: { property: 'date', direction: 'asc' },
    },
    {
      id: 3,
      text: 'Betrag absteigend',
      order: { property: 'amount', direction: 'desc' },
    },
    {
      id: 4,
      text: 'Betrag aufsteigend',
      order: { property: 'amount', direction: 'asc' },
    },
    {
      id: 5,
      text: 'Empfänger A-Z',
      order: { property: 'recipient', direction: 'asc' },
    },
    {
      id: 6,
      text: 'Empfänger Z-A',
      order: { property: 'recipient', direction: 'desc' },
    },
    {
      id: 7,
      text: 'Verwendungszweck A-Z',
      order: { property: 'purpose', direction: 'asc' },
    },
    {
      id: 8,
      text: 'Verwendungszweck Z-A',
      order: { property: 'purpose', direction: 'desc' },
    },
  ];

  ngOnInit() {
    this.searchFormControl.valueChanges
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => this.store.setFilter({ search: term }));
  }
}
