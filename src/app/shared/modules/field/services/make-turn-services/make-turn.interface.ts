import {FieldBoxInterface} from '../../../../../core/interfaces/fieldBox.interface';

export interface MakeTurnInterface {

  init: (array: FieldBoxInterface[]) => void;

  makeTurn: (boxId: number) => void;

}
