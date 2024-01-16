import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length === 9) {
      const firstPart = value.substring(0, 3);
      const secondPart = value.substring(3, 6);
      const thirdPart = value.substring(6, 9);

      return `${firstPart} ${secondPart} ${thirdPart}`;
    } else {
      return value;
    }
  }

}
