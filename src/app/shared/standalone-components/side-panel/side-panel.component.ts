import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainFieldService} from '../../modules/field/services/main-field.service';
import {MatButtonModule} from '@angular/material/button';
import {NavigationPanelModule} from '../../modules/navigation-panel/navigation-panel.module';
import {HEADERS} from '../../../core/constants/headers';
import {ModalService} from '../../../core/services/modal.service';
import {SettingsModalComponent} from '../../modules/modal/settings-modal/settings-modal.component';
import {MODAL_TITLES} from '../../../core/constants/modal-titles';

@Component({
  standalone: true,
  selector: 'app-side-panel',
  imports: [CommonModule, MatButtonModule, NavigationPanelModule],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {

  public title: string;

  constructor(
    private mainFieldService: MainFieldService,
    private modalService: ModalService,
  ) {
    this.title = HEADERS.SIDE_PANEL_HEADER;
  }

  public resetGame(): void {
    this.mainFieldService.resetGame();
  }

  public openSettings(): void {
    this.modalService.createModal(SettingsModalComponent, { title: MODAL_TITLES.SETTINGS_TITLE });
  }

}
