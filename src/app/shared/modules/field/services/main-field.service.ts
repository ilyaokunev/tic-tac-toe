import {ChangeDetectorRef, Injectable} from '@angular/core';
import {FieldBoxInterface, FilledFieldStatus} from "../../../../core/interfaces/fieldBox.interface";
import {FIELD_STATUSES} from "../../../../core/constants/field-statuses";

@Injectable({
  providedIn: 'root'
})
export class MainFieldService {

  private fieldMatrix: FieldBoxInterface[] = [];
  private whichTurn: FilledFieldStatus = FIELD_STATUSES.CROSS;
  private rowSize: number = 3;


  public createField(rowSize: number): void {
    this.rowSize = rowSize;

    const arrayLength = this.rowSize**2;
    for (let i = 0; i < arrayLength; i++) {

      const rowId = this.getRowId(i).toString();

      const boxObject: FieldBoxInterface = {
        id: i.toString(),
        fieldStatus: 'untouched',
        rowId: rowId,
      }

      this.fieldMatrix.push(boxObject);
    }
  }

  public getField(): FieldBoxInterface[] {
    return this.fieldMatrix;
  }

  private getRowId(boxId: number): number {
    const rowId = Math.floor(boxId / this.rowSize)
    return rowId;
  }

  public makeTurn(boxId: number): void {
    const currentBox = this.fieldMatrix[boxId];
    if (currentBox.fieldStatus === FIELD_STATUSES.UNTOUCHED) {
      currentBox.fieldStatus = this.whichTurn;
      this.setWhichTurn();
    }
  }

  private setWhichTurn(): void {
    this.whichTurn = this.whichTurn === FIELD_STATUSES.CROSS
      ? FIELD_STATUSES.NOUGHT : FIELD_STATUSES.CROSS;
  };

}
