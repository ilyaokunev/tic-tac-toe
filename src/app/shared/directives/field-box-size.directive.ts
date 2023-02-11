import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {
  BOX_CONTAINER_FULL_WIDTH,
  BOX_CONTAINER_GAP,
} from "../../core/constants/box-container-style-sizes";


@Directive({
  selector: '[appFieldBoxSize]'
})
export class FieldBoxSizeDirective implements OnInit, OnDestroy {

  @Input() numberOfElementsInRow: number | undefined;

  protected subscription = new Subscription();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.setBoxSizes();
    // this.setMaxSizes();
    this.subscription.add(
      fromEvent(window, 'resize').pipe(
        debounceTime(50),
      ).subscribe(
        () => this.setBoxSizes()
      )
    )
  }

  private setBoxSizes(): void {
      const elementStyle = this.el.nativeElement.style;
      const relativelyWidth = this.calculateRelativelyBoxWidth();

    if (relativelyWidth) {
        elementStyle.width = `${relativelyWidth}%`;
        elementStyle.paddingTop = `${relativelyWidth}%`;
      }
    }

  private calculateRelativelyBoxWidth(): number | void {
    if (this.numberOfElementsInRow) {
      const widthForBox = Math.floor(this.getContainerWidthForDividing() / this.numberOfElementsInRow);
      return widthForBox;
    }
  }

  private getContainerWidthForDividing(): number {
    return BOX_CONTAINER_FULL_WIDTH - ( BOX_CONTAINER_GAP * 2);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
