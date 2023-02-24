import { Injectable} from '@angular/core';
import { FieldBoxInterface, FilledFieldStatus } from '../../../../core/interfaces/fieldBox.interface';
import { FIELD_STATUSES } from '../../../../core/constants/field-statuses';
import { EndGameWinnerCheckService } from './end-game-winner-check.service';
import { ModalService } from '../../../../core/services/modal.service';
import { EndGameModalComponent } from '../../modal/end-game-modal/end-game-modal.component';
import {Subject, take} from 'rxjs';
import {MODAL_TITLES} from '../../../../core/constants/modal-titles';

@Injectable()
export class MainFieldService {

  private fieldMatrix: FieldBoxInterface[] = [];

  private isTurnsBlocked = false;

  private whichTurn: FilledFieldStatus = FIELD_STATUSES.CROSS;

  private rowSize = 3;

  public reset$ = new Subject();

  constructor(
    private endGameChecker: EndGameWinnerCheckService,
    private modalService: ModalService,
  ) {
    this.subscribeForWinner();
  }

  private subscribeForWinner(): void {
    this.endGameChecker.winner$.subscribe((winner) => {
      this.modalService.createModal(
        EndGameModalComponent,
        { title: MODAL_TITLES.END_GAME_TITLE, data: {winner} },
        this.blockField.bind(this),
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
  };

  public getField(): FieldBoxInterface[] {
    return this.fieldMatrix;
  };

  private getRowId(boxId: number): number {
    const rowId = Math.floor(boxId / this.rowSize)
    return rowId;
  };

  public makeTurn(boxId: number): void {
      const currentBox = this.fieldMatrix[boxId];

      if ( !this.isTurnsBlocked && currentBox.fieldStatus === FIELD_STATUSES.UNTOUCHED ) {
        currentBox.fieldStatus = this.whichTurn;
        this.endGameChecker.startCheck(this.fieldMatrix, this.whichTurn);
        this.setWhichTurn();
      }

  };

  private setWhichTurn(): void {
    this.whichTurn = this.whichTurn === FIELD_STATUSES.CROSS
      ? FIELD_STATUSES.NOUGHT : FIELD_STATUSES.CROSS;
  };

  public resetGame(): void {
    this.resetFieldStatuses();
    this.whichTurn = FIELD_STATUSES.CROSS;
    this.reset$.next(true);
    this.unblockField();
  }

  private resetFieldStatuses(): void {
    this.fieldMatrix.forEach( box => {
      box.fieldStatus = FIELD_STATUSES.UNTOUCHED;
    });
  }

  private blockField(): void {
    this.isTurnsBlocked = true;
  }

  private unblockField(): void {
    this.isTurnsBlocked = false;
  }
}
