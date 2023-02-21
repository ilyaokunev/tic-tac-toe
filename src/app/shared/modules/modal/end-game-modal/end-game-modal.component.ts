import { Component } from '@angular/core';

@Component({
  selector: 'app-end-game-modal',
  templateUrl: './end-game-modal.component.html',
  styleUrls: ['./end-game-modal.component.css']
})
export class EndGameModalComponent {

  public number: number = 0;

  public upCount() {
    this.number++;
  }
}
