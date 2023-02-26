import {Inject, Injectable} from '@angular/core';
import {MakeTurnInterface} from './make-turn.interface';
import {MainFieldService} from '../main-field.service';
import {FieldBoxInterface, FilledFieldStatus} from '../../../../../core/interfaces/fieldBox.interface';
import {FIELD_STATUSES} from '../../../../../core/constants/field-statuses';
import {END_GAME_CHECK_SERVICE_TOKEN} from '../../../../../core/tokens/end-game-check-service.token';
import {EndGameCheckInterface} from '../end-game-check-services/end-game-check.interface';
import {EndGameModalComponent} from '../../../modal/end-game-modal/end-game-modal.component';
import {MODAL_TITLES} from '../../../../../core/constants/modal-titles';
import {ModalService} from '../../../../../core/services/modal.service';
import {EndGameCheckClassicService} from '../end-game-check-services/end-game-check-classic.service';
import {EndGameCheckBotService} from '../end-game-check-services/end-game-check-bot.service';

@Injectable({
  providedIn: 'root',
})
export class MakeTurnBotService implements MakeTurnInterface {

  private fieldMatrix: FieldBoxInterface[] = [];

  private isTurnsBlocked = false;

  public whichTurn: FilledFieldStatus = FIELD_STATUSES.CROSS;

  constructor(
    private mainFieldService: MainFieldService,
    private modalService: ModalService,
    private endGameChecker: EndGameCheckBotService,
  ) {
    setTimeout(() => {
      this.fieldMatrix = this.mainFieldService.getField();
      this.endGameChecker.init(this.fieldMatrix);
    }, 0);
    this.subscribeForWinner();
    this.subscribeForReset();
  }

  public subscribeForReset(): void {
    this.mainFieldService.reset$.subscribe(() => {
      this.reset();
    })
  }

  public subscribeForWinner(): void {
    this.endGameChecker.winner$.subscribe((winner) => {
      this.modalService.createModal(
        EndGameModalComponent,
        { title: MODAL_TITLES.END_GAME_TITLE, data: {winner} },
        this.blockField.bind(this),
      );
    })
  }

  public makeTurn(boxId: number): void {
    console.log('bot service');
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

  private blockField(): void {
    this.isTurnsBlocked = true;
  }

  private unblockField(): void {
    this.isTurnsBlocked = false;
  }

  private reset(): void {
    this.unblockField();
    this.whichTurn = FIELD_STATUSES.CROSS;
  }



}
