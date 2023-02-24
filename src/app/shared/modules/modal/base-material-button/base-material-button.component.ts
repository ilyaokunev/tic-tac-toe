import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-base-material-button',
  templateUrl: './base-material-button.component.html',
  styleUrls: ['./base-material-button.component.scss']
})
export class BaseMaterialButtonComponent {

  @Input()
  iconName = ''

}
