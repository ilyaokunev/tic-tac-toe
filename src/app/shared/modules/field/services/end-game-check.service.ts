import { Injectable } from '@angular/core';
import {FieldBoxInterface} from '../../../../core/interfaces/fieldBox.interface';
import {Subject} from 'rxjs';

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


@Injectable({
    providedIn: 'root'
  })
export class EndGameCheckService {

  public winner$ = new Subject<string>();

  constructor() { }

  public isFinished(fieldMatrix: FieldBoxInterface[], whichLastTurn: string): void {
    const arrayOfCurrentPlayerBoxes = fieldMatrix.filter(boxObj => boxObj.fieldStatus === whichLastTurn).map(boxObj => boxObj.id);
    this.winner$.next(whichLastTurn);
  }
}
