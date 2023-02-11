import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldComponent} from "./components/field/field.component";
import {MainFieldService} from "./services/main-field.service";
import { FieldBoxComponent } from './components/field-box/field-box.component';
import {FieldBoxSizeDirective} from "../../directives/field-box-size.directive";



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
    CommonModule
  ]
})
export class FieldModule { }
