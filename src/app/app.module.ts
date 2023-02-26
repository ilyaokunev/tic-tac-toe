import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FieldModule} from "./shared/modules/field/field.module";
import {ModalModule} from './shared/modules/modal/modal.module';
import {AppRoutingModule} from './shared/modules/app-routing/app-routing.module';
import { SidePanelComponent } from './shared/standalone-components/side-panel/side-panel.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FieldModule,
        ModalModule,
        AppRoutingModule,
        SidePanelComponent,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
