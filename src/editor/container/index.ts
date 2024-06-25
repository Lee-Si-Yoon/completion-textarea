import { Textarea } from './textarea';
import { Canvas } from './canvas';
import { Selection } from '../selection';
import { Document } from '../document';

export class Container {
  public textarea: Textarea;
  public canvas: Canvas;
  public element: HTMLDivElement;

  constructor({
    document,
    selection,
    container,
    textarea,
    canvas,
  }: {
    document: Document;
    selection: Selection;
    container: HTMLDivElement;
    textarea: HTMLTextAreaElement;
    canvas: HTMLCanvasElement;
  }) {
    this.element = container;
    this.textarea = new Textarea({
      document,
      selection,
      element: textarea,
      container: this.element,
    });
    this.canvas = new Canvas(canvas);

    this.initialize();
    this.bindListeners();
  }

  private initialize() {
    this.element.style.position = 'relative';
    this.element.tabIndex = 0;
  }

  private bindListeners() {
    this.element.addEventListener(
      'focus',
      () => {
        this.textarea.element.focus();
      },
      false,
    );
  }

  public resize(width: number, height: number) {
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  public focus() {
    this.element.focus();
  }
}
