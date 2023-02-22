import {Component, ElementRef, Injector, Input, OnInit, Renderer2, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalDataInterface} from '../../../core/interfaces/modalData.interface';
import {EndGameModalComponent} from './end-game-modal/end-game-modal.component';

@Component({
  selector: 'app-base-modal' +
    '',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnInit {

  @Input()
  public componentForContent!: Type<any>;

  @Input()
  public modalProps!: ModalDataInterface;

  @ViewChild('modalContent', { read: ViewContainerRef, static: true })
  public readonly modalContent!:ViewContainerRef;

  public title: string | undefined = '';

  constructor(
    private readonly renderer:Renderer2,
    private readonly elRef:ElementRef,
    private readonly injector: Injector,
  ) {
  }

  ngOnInit(): void {
    this.createContent();
    const { title } = this.modalProps;
    this.setTitle(title);
  }


  private createContent(): void {
    const injector = Injector.create([],this.injector);
    const contentComponentRef = this.modalContent.createComponent(this.componentForContent, {injector});

  }

  private setTitle(title: string | undefined): void {
    this.title = title;
  }
}
