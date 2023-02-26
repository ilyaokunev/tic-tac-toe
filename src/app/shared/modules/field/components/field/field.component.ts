import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MainFieldService} from '../../services/main-field.service';
import {FieldBoxInterface} from '../../../../../core/interfaces/fieldBox.interface';
import {Subscription} from 'rxjs';
import {MAKE_TURN_SERVICE_TOKEN} from '../../../../../core/tokens/make-turn-service.token';
import {MakeTurnInterface} from '../../services/make-turn-services/make-turn.interface';

@Component({
  selector: 'app-field[fieldSize]',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnDestroy {

  @Input()
  fieldSize = '3';

  public field: FieldBoxInterface[];

  private subscription = new Subscription();

  constructor(
    private mainFieldService: MainFieldService,
    @Inject(MAKE_TURN_SERVICE_TOKEN) private makeTurnService: MakeTurnInterface,
  ) {
    const fieldSizeInNumber = +this.fieldSize;
    this.mainFieldService.createField(fieldSizeInNumber);
    this.field = this.mainFieldService.getField();
  }

  public trackByFunc(index: number): number {
    return index;
  };

  public makeTurn(boxIndex: number): void {
    this.makeTurnService.makeTurn(boxIndex);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

}
