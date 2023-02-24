import { Injectable} from '@angular/core';
import { FieldBoxInterface, FilledFieldStatus } from '../../../../core/interfaces/fieldBox.interface';
import { FIELD_STATUSES } from '../../../../core/constants/field-statuses';
import { EndGameCheckService } from './end-game-check.service';
import { ModalService } from '../../../../core/services/modal.service';
import { EndGameModalComponent } from '../../modal/end-game-modal/end-game-modal.component';
import { take } from 'rxjs';
import {MODAL_TITLES} from '../../../../core/constants/modal-titles';

@Injectable()
export class MainFieldService {

  private fieldMatrix: FieldBoxInterface[] = [];
  private whichTurn: FilledFieldStatus = FIELD_STATUSES.CROSS;
  private rowSize = 3;

  constructor(
    private endGameChecker: EndGameCheckService,
    private modalService: ModalService,
  ) {
    this.subscribeForWinner();
  }

  // нужно продумать логику начала новой партии, чтобы решить нужен ли тут take
  private subscribeForWinner(): void {
    this.endGameChecker.winner$.pipe(
      take(1),
    ).subscribe((winner) => {
      this.modalService.createModal(
        EndGameModalComponent, { title: MODAL_TITLES.END_GAME_TITLE, data: {winner} }
      );
    })
  }

  public createField(rowSize: number): void {
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
        this.endGameChecker.isFinished(this.fieldMatrix, this.whichTurn);
        this.setWhichTurn();
      }
  }

  private setWhichTurn(): void {
    this.whichTurn = this.whichTurn === FIELD_STATUSES.CROSS
      ? FIELD_STATUSES.NOUGHT : FIELD_STATUSES.CROSS;
  };

}
