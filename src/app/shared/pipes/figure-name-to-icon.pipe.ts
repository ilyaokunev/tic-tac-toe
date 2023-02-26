import { Pipe, PipeTransform } from '@angular/core';
import {FIELD_STATUSES} from '../../core/constants/field-statuses';

@Pipe({
  name: 'figureNameToIcon'
})
export class FigureNameToIconPipe implements PipeTransform {

  transform(value: unknown): unknown {
    return value === FIELD_STATUSES.CROSS ? 'X' : value === FIELD_STATUSES.NOUGHT ? 'O' : value;
  }

}
