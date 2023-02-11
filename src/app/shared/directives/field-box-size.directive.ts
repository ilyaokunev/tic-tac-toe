import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, fromEvent, Subscription} from 'rxjs';
import {
  BOX_CONTAINER_FULL_WIDTH,
  BOX_CONTAINER_GAP,
  WIDTH_MULTIPLE
} from '../../core/constants/box-container-style-sizes';


@Directive({
  selector: '[appFieldBoxSize]'
})
export class FieldBoxSizeDirective implements OnInit, OnDestroy {

  @Input() numberOfElementsInRow: number | undefined;

  protected subscription = new Subscription();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.setBoxSizes();
    this.subscription.add(
      fromEvent(window, 'resize').pipe(
        debounceTime(50),
      ).subscribe(
        () => this.setBoxSizes()
      )
    );
  }

  private setBoxSizes(): void {
      const elementStyle = this.el.nativeElement.style;
      const relativelyWidth = this.calculateRelativelyBoxWidth();

      if (relativelyWidth) {
        elementStyle.height = this.calculateBoxWidthInPixels(relativelyWidth);
        elementStyle.width = elementStyle.height;
    }
    }

  private calculateRelativelyBoxWidth(): number | void {
    if (this.numberOfElementsInRow) {
      const widthForBox = Math.floor(this.getContainerWidthForDividing() * WIDTH_MULTIPLE / this.numberOfElementsInRow);
      return widthForBox;
    }
  }

  private getContainerWidthForDividing(): number {
    return BOX_CONTAINER_FULL_WIDTH - ( BOX_CONTAINER_GAP * 2 );
  }

  private calculateBoxWidthInPixels(widthInPercent: number): string {
    const widthInPixels = window.innerHeight * widthInPercent / 100;
    return `${widthInPixels}px`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
