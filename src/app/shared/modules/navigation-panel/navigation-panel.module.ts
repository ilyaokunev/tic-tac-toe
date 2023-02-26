import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel.component';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from '../app-routing/app-routing.module';



@NgModule({
  declarations: [
    NavigationPanelComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  exports: [NavigationPanelComponent]
})
export class NavigationPanelModule { }
