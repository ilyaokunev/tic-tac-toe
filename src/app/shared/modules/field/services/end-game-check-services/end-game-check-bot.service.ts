import { Injectable } from '@angular/core';
import {FieldBoxInterface, FieldStatus} from '../../../../../core/interfaces/fieldBox.interface';
import {Subject} from 'rxjs';
import {EndGameCheckInterface} from './make-turn.interface';

const winIndex = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

const MINIMUM_TURNS_TO_WIN = 5;

@Injectable({
    providedIn: 'root'
  })
export class EndGameCheckBotService implements EndGameCheckInterface {

  private turnCount: number;

  private matrix:FieldBoxInterface[];

  private whichTurn: FieldStatus;

  public winner$: Subject<string>;

  constructor() {
    this.turnCount = 0;
    this.matrix = [];
    this.whichTurn = 'untouched';
    this.winner$ = new Subject<string>()
  }

  public startCheck(fieldMatrix: FieldBoxInterface[], whichLastTurn: FieldStatus): void {
    this.turnCount++;
    if (this.turnCount >= MINIMUM_TURNS_TO_WIN) {
      this.matrix = fieldMatrix;
      this.whichTurn = whichLastTurn;
      this.check();
    }
  }

  private check(): void {
    const filtredMatrix = this.matrix.filter(box => box.fieldStatus === this.whichTurn);
    const mappedMatrix = filtredMatrix.map( elem => +elem.id + 1);

    const currentWinCombination = winIndex.filter( (winCombination) => {
      for (let i = 0; i < winCombination.length; i++ ) {
        if( mappedMatrix.indexOf(winCombination[i]) === -1 ) return false;
      }
      return true;
    } )

    if (currentWinCombination.length) this.setWinner();

  }

  private setWinner(): void {
    this.winner$.next(this.whichTurn);
  }
}
