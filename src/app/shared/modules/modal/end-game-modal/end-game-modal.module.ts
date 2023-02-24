import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FigureNameToIconPipe} from '../../../pipes/figure-name-to-icon.pipe';
import {EndGameModalComponent} from './end-game-modal.component';



@NgModule({
  declarations: [
    EndGameModalComponent,
    FigureNameToIconPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class EndGameModalModule { }
