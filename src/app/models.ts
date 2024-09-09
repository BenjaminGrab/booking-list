export interface SortOrder<T> {
  property: keyof T;
  direction: 'asc' | 'desc';
}

export type BookingCategory =
  | 'all'
  | 'employee'
  | 'expenses'
  | 'services'
  | 'charges';

export interface BookingFilter {
  category?: BookingCategory;
  search?: string;
}

export interface Booking {
  date: string;
  amount: number;
  category: BookingCategory;
  recipient: string;
  purpose: string;
  id: string;
}

export const bookingCategories: BookingCategory[] = [
  'employee',
  'expenses',
  'services',
  'charges',
];
