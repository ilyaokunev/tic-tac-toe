import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseModalComponent} from './base-modal.component';
import { EndGameModalComponent } from './end-game-modal/end-game-modal.component';
import {MatIconModule} from '@angular/material/icon';
import { BaseMaterialButtonComponent } from './base-material-button/base-material-button.component';
import {FigureNameToIconPipe} from '../../pipes/figure-name-to-icon.pipe';
import {EndGameModalModule} from './end-game-modal/end-game-modal.module';



@NgModule({
  declarations: [
    BaseModalComponent,
    BaseMaterialButtonComponent,
  ],
  exports: [
    BaseModalComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
      EndGameModalModule,
    ]
})
export class ModalModule { }
