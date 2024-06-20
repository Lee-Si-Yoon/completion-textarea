import { Listeners } from './listeners';

export class Textarea {
  public element: HTMLTextAreaElement;

  private listeners: Listeners;
  private container: HTMLDivElement;

  constructor(element: HTMLTextAreaElement, container: HTMLDivElement) {
    this.container = container;
    this.element = element;

    this.listeners = new Listeners(this.element, this.container);
    this.listeners.register();

    this.initialize();
  }

  private initialize() {
    this.element.style.position = 'absolute';
    this.element.style.bottom = '0';
    this.element.style.left = '0';
    this.element.style.padding = '0';
    this.element.style.border = 'none';
  }

  public resize(width: number, height: number) {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }
}
