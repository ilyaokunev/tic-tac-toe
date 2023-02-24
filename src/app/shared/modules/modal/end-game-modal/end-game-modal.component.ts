import {AfterContentInit, Component, Input} from '@angular/core';
import {EndGameModalDataInterface} from './end-game-modal-data-interface';

@Component({
  selector: 'app-end-game-modal',
  templateUrl: './end-game-modal.component.html',
  styleUrls: ['./end-game-modal.component.css']
})
export class EndGameModalComponent implements AfterContentInit {

  public winner?: string;

  @Input()
  data!: EndGameModalDataInterface;

  ngAfterContentInit(): void {
    this.winner = this.data.winner;
  }

}
