import { Listeners } from './listeners';

export class Textarea {
  private listeners: Listeners;
  private _container: HTMLDivElement;
  private _element: HTMLTextAreaElement;

  private _width: number;
  private _height: number;

  constructor(element: HTMLTextAreaElement, container: HTMLDivElement) {
    this._container = container;
    this._element = element;

    this._width = 400;
    this._height = 200;

    this.listeners = new Listeners(this._element, this._container);
    this.listeners.register();

    this.styleTextarea();
  }

  private styleTextarea() {
    this._element.style.position = 'absolute';
    this._element.style.top = '0';
    this._element.style.left = '0';
    this._element.style.padding = '0';
    this._element.style.border = 'none';
    this._element.style.width = `${this._width}px`;
    this._element.style.height = `${this._height}px`;
  }

  get element() {
    return this._element;
  }
}
