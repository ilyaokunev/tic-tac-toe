import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FieldComponent} from '../field/components/field/field.component';
import {MAKE_TURN_SERVICE_TOKEN} from '../../../core/tokens/make-turn-service.token';
import {MakeTurnClassicService} from '../field/services/make-turn-services/make-turn-classic.service';
import {MakeTurnBotService} from '../field/services/make-turn-services/make-turn-bot.service';

const routes: Routes = [
  {
    path: 'error', loadComponent: () => import('../../standalone-components/error-page/error-page.component')
      .then(component => component.ErrorPageComponent),
  },
  {
    path:'bot', component: FieldComponent, providers: [
      {
        provide: MAKE_TURN_SERVICE_TOKEN, useClass: MakeTurnBotService,
      }
    ]
  },
  {
    path: 'classic', component: FieldComponent, providers: [
      {
        provide: MAKE_TURN_SERVICE_TOKEN, useClass: MakeTurnClassicService,
      }
    ]
  },
  {
    path: '**', redirectTo: '/classic',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
