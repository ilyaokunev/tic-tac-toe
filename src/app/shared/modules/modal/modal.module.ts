import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseModalComponent} from './base-modal.component';
import { EndGameModalComponent } from './end-game-modal/end-game-modal.component';
import {MatIconModule} from '@angular/material/icon';
import { BaseMaterialButtonComponent } from './base-material-button/base-material-button.component';



@NgModule({
  declarations: [
    BaseModalComponent,
    EndGameModalComponent,
    BaseMaterialButtonComponent,
  ],
  exports: [
    BaseModalComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ]
})
export class ModalModule { }
