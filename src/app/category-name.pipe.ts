import { Pipe, PipeTransform } from '@angular/core';
import { BookingCategory } from './models';

@Pipe({
  name: 'categoryName',
  standalone: true,
})
export class CategoryNamePipe implements PipeTransform {
  transform(value: BookingCategory) {
    switch (value) {
      case 'all':
        return 'Alle';
      case 'charges':
        return 'Belastungen';
      case 'expenses':
        return 'Sonderausgaben';
      case 'services':
        return 'Dienstleistungen';
      case 'employee':
        return 'Arbeitnehmer';
    }
  }
}
