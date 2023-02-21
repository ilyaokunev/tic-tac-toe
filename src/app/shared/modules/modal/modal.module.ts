import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseModalComponent} from './base-modal.component';
import { EndGameModalComponent } from './end-game-modal/end-game-modal.component';



@NgModule({
  declarations: [
    BaseModalComponent,
    EndGameModalComponent
  ],
  exports: [
    BaseModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
