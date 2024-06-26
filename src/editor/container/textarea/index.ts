import type { Selection } from '../../selection';
import type { Document } from '../../document';
import { Listeners } from './listeners';

export class Textarea {
  public element: HTMLTextAreaElement;

  private listeners: Listeners;
  private container: HTMLDivElement;

  constructor({
    document,
    selection,
    element,
    container,
  }: {
    document: Document;
    selection: Selection;
    element: HTMLTextAreaElement;
    container: HTMLDivElement;
  }) {
    this.container = container;
    this.element = element;

    this.listeners = new Listeners({
      document,
      selection,
      textarea: this.element,
      container: this.container,
    });
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
