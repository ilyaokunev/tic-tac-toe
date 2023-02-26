import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldComponent} from './components/field/field.component';
import { FieldBoxComponent } from './components/field-box/field-box.component';
import {FieldBoxSizeDirective} from '../../directives/field-box-size.directive';
import {EndGameCheckClassicService} from './services/end-game-check-services/end-game-check-classic.service';
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
  providers: [
    EndGameCheckClassicService,
    MainFieldService
  ],
})
export class FieldModule { }
