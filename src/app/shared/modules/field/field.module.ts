import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldComponent} from './components/field/field.component';
import { FieldBoxComponent } from './components/field-box/field-box.component';
import {FieldBoxSizeDirective} from '../../directives/field-box-size.directive';
import {EndGameCheckService} from './services/end-game-check.service';
import {MainFieldService} from './services/main-field.service';



@NgModule({
  declarations: [
    FieldComponent,
    FieldBoxComponent,
    FieldBoxSizeDirective,
  ],
  exports: [
    FieldComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [EndGameCheckService,
  MainFieldService],
})
export class FieldModule { }
