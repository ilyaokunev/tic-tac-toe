import {Subject} from 'rxjs';
import {FieldBoxInterface, FieldStatus} from '../../../../../core/interfaces/fieldBox.interface';

export interface EndGameCheckInterface {

  winner$:Subject<string>;

  startCheck: (fieldMatrix: FieldBoxInterface[], whichLastTurn: FieldStatus) => void;

}
