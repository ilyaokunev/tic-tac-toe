import { Injectable} from '@angular/core';
import { FieldBoxInterface,} from '../../../../core/interfaces/fieldBox.interface';
import { FIELD_STATUSES } from '../../../../core/constants/field-statuses';
import {Subject} from 'rxjs';

@Injectable()
export class MainFieldService {

  private fieldMatrix: FieldBoxInterface[] = [];

  private rowSize = 3;

  public reset$ = new Subject();

  public createField(rowSize: number): void {

    if (!this.fieldMatrix.length) {

      this.rowSize = rowSize;

      const arrayLength = this.rowSize **2;
      for (let i = 0; i < arrayLength; i++) {

        const rowId = this.getRowId(i).toString();

        const boxObject: FieldBoxInterface = {
          id: i.toString(),
          fieldStatus: 'untouched',
          rowId,
        };

        this.fieldMatrix.push(boxObject);
      }
    }
  };

  public getField(): FieldBoxInterface[] {
    return this.fieldMatrix;
  };

  private getRowId(boxId: number): number {
    const rowId = Math.floor(boxId / this.rowSize)
    return rowId;
  };

  public resetGame(): void {
    this.resetFieldStatuses();
    this.reset$.next(true);
  }

  private resetFieldStatuses(): void {
    this.fieldMatrix.forEach( box => {
      box.fieldStatus = FIELD_STATUSES.UNTOUCHED;
    });
  }

}
