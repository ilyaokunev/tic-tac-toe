import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FieldModule} from "./shared/modules/field/field.module";
import {ModalModule} from './shared/modules/modal/modal.module';
import { FigureNameToIconPipe } from './shared/pipes/figure-name-to-icon.pipe';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FieldModule,
        ModalModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
