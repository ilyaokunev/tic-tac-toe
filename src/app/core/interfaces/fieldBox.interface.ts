 export interface FieldBoxInterface {
  id: string;
  rowId: string;
  fieldStatus: FieldStatus;
 }

 export type FieldStatus =  FilledFieldStatus | Untouched;

 export type FilledFieldStatus = Cross | Nought;

 export type Cross = 'cross';

 export type Nought = 'cross';

 export type Untouched = 'untouched';
