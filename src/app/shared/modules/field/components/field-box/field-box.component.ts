import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import { FieldStatus, FilledFieldStatus} from '../../../../../core/interfaces/fieldBox.interface';
import {FIELD_STATUSES} from '../../../../../core/constants/field-statuses';
import {CROSS_AND_NOUGHT_IMG_PATHES} from '../../../../../core/constants/cross-and-nought-img-pathes';

@Component({
  selector: 'app-field-box[numberOfElementsInRow][boxStatus]',
  templateUrl: './field-box.component.html',
  styleUrls: ['./field-box.component.scss']
})
export class FieldBoxComponent implements OnChanges {

  @Input()
  boxStatus!: FieldStatus;

  @ViewChild('boxContent')
  boxContent!: ElementRef;

  constructor(
    private renderer: Renderer2,
    ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['boxStatus']) {
      this.setBackground();
    }
  }

  private setBackground(): void {
    if (this.boxStatus !== FIELD_STATUSES.UNTOUCHED) {
      const status = this.boxStatus as FilledFieldStatus;
      const url = `url(${CROSS_AND_NOUGHT_IMG_PATHES[status]})`;
      this.renderer.setStyle(this.boxContent.nativeElement, 'backgroundImage', url);
    }
  }

}
