import {AfterContentInit, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EndGameModalDataInterface} from './end-game-modal-data-interface';
import {FULLSCREEN_MODE_EVENT_TOKEN} from '../../../../core/tokens/fullscreen-mode-event.token';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-end-game-modal',
  templateUrl: './end-game-modal.component.html',
  styleUrls: ['./end-game-modal.component.scss']
})
export class EndGameModalComponent implements OnInit, AfterContentInit, OnDestroy {

  public winner?: string;

  private subscription = new Subscription();

  @Input()
  data!: EndGameModalDataInterface;

  constructor(
    @Inject(FULLSCREEN_MODE_EVENT_TOKEN) private isFullscreenMode$: Observable<boolean>,
  ) {
  }

  ngOnInit():void {
    this.subscribeForFullscreenMode();
  }

  private subscribeForFullscreenMode(): void {
    this.subscription.add(
      this.isFullscreenMode$.subscribe((data) => {
        console.log(data);
      })
    )
  }

  ngAfterContentInit(): void {
    this.winner = this.data.winner;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
