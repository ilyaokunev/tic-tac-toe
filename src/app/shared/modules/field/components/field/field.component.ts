import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MainFieldService} from '../../services/main-field.service';
import {FieldBoxInterface} from '../../../../../core/interfaces/fieldBox.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-field[fieldSize]',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {

  @Input()
  fieldSize = '3';

  public field: FieldBoxInterface[] | undefined;

  private subscription = new Subscription();

  constructor(
    private mainFieldService: MainFieldService) {
  }

  ngOnInit(): void {
    const fieldSizeInNumber = +this.fieldSize;
    this.mainFieldService.createField(fieldSizeInNumber);
    this.setFieldFromMainFieldService();
    this.subscribeForReset();
  }

  private subscribeForReset(): void {
    this.subscription.add(
      this.mainFieldService.reset$.subscribe(() => {
        this.setFieldFromMainFieldService();
      })
    )
  }

  private setFieldFromMainFieldService(): void {
    this.field = this.mainFieldService.getField();
  };

  public trackByFunc(index: number): number {
    return index;
  };

  public makeTurn(boxIndex: number): void {
    this.mainFieldService.makeTurn(boxIndex);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

}
