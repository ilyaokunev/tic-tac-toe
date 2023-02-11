import { Injectable } from '@angular/core';
import {FieldBoxInterface} from '../../../../core/interfaces/fieldBox.interface';

@Injectable({
  providedIn: 'root'
})
export class EndGameCheckService {

  constructor() { }

  public isFinished(fieldMatrix: FieldBoxInterface[]): boolean {
    return true;
  }
}
