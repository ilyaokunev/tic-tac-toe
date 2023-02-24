import {
  ApplicationRef,
  ComponentFactoryResolver, ComponentRef,
  EmbeddedViewRef, Inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  Type
} from '@angular/core';
import {ModalDataInterface} from '../interfaces/modalData.interface';
import {BaseModalComponent} from '../../shared/modules/modal/base-modal.component';
import {DOCUMENT} from '@angular/common';
import MODAL_DATA_DEFAULT from '../constants/modal-data-params-default';
import {Subject, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private renderer: Renderer2;

  constructor(
    private readonly appRef:ApplicationRef,
    // приходится использовать устаревшие апи, тк в сервисе пока не понял как можно иначе создать компонент
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    // получение фабрики для создания рендерера, тк в сервисе мы его напрямую получить не можем
    private readonly rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public createModal(modalComponent: Type<any>, props?: ModalDataInterface, closeCallback?: Function): void {

    const baseModalComponentComponentRef =
      this.componentFactoryResolver.resolveComponentFactory(BaseModalComponent).create(this.injector);

    baseModalComponentComponentRef.instance.componentForContent = modalComponent;
    baseModalComponentComponentRef.instance.modalProps = {
      title: props?.title || MODAL_DATA_DEFAULT.title,
      isFullscreen: props?.isFullscreen || MODAL_DATA_DEFAULT.isFullscreen,
      data: props?.data || MODAL_DATA_DEFAULT.data,
    };

    // подписывается на событие закрытия модалки, чтобы уничтожить элемент
    baseModalComponentComponentRef.instance.closeModalEvent$.pipe(
      take(1),
    ).subscribe(() => {
        if (closeCallback) {
          closeCallback();
        }
        this.destroyModal(baseModalComponentComponentRef);
      }
    )

    // Добавляем в дерево компонентов чтобы Ангуляр мог отслеживать изменения в компоненте
    this.appRef.attachView(baseModalComponentComponentRef.hostView);

    // создание ДОМ элемента
    const domElemFromComponent = (baseModalComponentComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.renderer.appendChild(this.document.body, domElemFromComponent);
  }


  private destroyModal(componentRef: ComponentRef<BaseModalComponent>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
