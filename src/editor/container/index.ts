import { Textarea } from './textarea';
import type { Document } from './document';

export class Container {
  private _document: Document;
  private _container: HTMLDivElement;
  private _main: Textarea;
  private _sub: Textarea;

  constructor(
    document: Document,
    container: HTMLDivElement,
    main: HTMLTextAreaElement,
    sub: HTMLTextAreaElement,
  ) {
    this._document = document;

    this._container = container;
    this._sub = new Textarea(sub, this._container);
    this._main = new Textarea(main, this._container);

    this.styleContainer();
    this.bindListeners();
  }

  private styleContainer() {
    this._container.style.position = 'relative';
    this._container.tabIndex = 0;
    this._container.style.width = this._main.element.style.width;
    this._container.style.height = this._main.element.style.height;
  }

  private bindListeners() {
    this._container.addEventListener(
      'focus',
      () => {
        this._main.element.focus();
      },
      false,
    );
  }
}
