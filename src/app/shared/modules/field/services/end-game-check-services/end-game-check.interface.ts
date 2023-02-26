import {Subject} from 'rxjs';
import {FieldBoxInterface, FieldStatus} from '../../../../../core/interfaces/fieldBox.interface';

export interface EndGameCheckInterface {

  init:(matrix: FieldBoxInterface[]) => void;

  winner$:Subject<string>;

  startCheck: (whichLastTurn: FieldStatus) => void;

}
