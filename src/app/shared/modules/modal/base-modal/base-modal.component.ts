import {Component, ElementRef, Injector, Input, OnInit, Renderer2, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalDataInterface} from '../../../../core/interfaces/modalData.interface';
import {Observable, Subject} from 'rxjs';
import {EndGameModalComponent} from '../end-game-modal/end-game-modal.component';

@Component({
  selector: 'app-base-modal' +
    '',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnInit {

  @Input()
  public componentForContent!: Type<any>;

  public closeModalEvent$ = new Subject();

  @Input()
  public modalProps!: ModalDataInterface;

  @ViewChild('modalContent', { read: ViewContainerRef, static: true })
  public readonly modalContent!:ViewContainerRef;

  public title: string | undefined = '';

  public isFullscreen = false;

  public isFullscreen$ = new Subject<boolean>();

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
    const component = this.modalContent.createComponent<ModalDataInterface>(this.componentForContent, {injector});
    component.instance.data = this.modalProps.data;
  }

  private setTitle(title: string | undefined): void {
    this.title = title;
  }

  public toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    this.isFullscreen$.next(this.isFullscreen);
  }

  public isFullscreenMode$():Observable<boolean> {
    return this.isFullscreen$.asObservable();
  }

  public closeModalFunc(data?: any): void {
    this.closeModalEvent$.next(data);
  }


  public ngOnDestroy(): void {
    this.closeModalEvent$.complete();
    this.isFullscreen$.complete();
  }

}
