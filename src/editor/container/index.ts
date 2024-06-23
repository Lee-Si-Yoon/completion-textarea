import { Textarea } from './textarea';
import { Canvas } from './canvas';
import { Selection } from '../selection';
import { Document } from '../document';

export class Container {
  public textarea: Textarea;
  public canvas: Canvas;
  public container: HTMLDivElement;

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
    this.container = container;
    this.textarea = new Textarea({
      document,
      selection,
      element: textarea,
      container: this.container,
    });
    this.canvas = new Canvas(canvas);

    this.initialize();
    this.bindListeners();
  }

  private initialize() {
    this.container.style.position = 'relative';
    this.container.tabIndex = 0;
  }

  private bindListeners() {
    this.container.addEventListener(
      'focus',
      () => {
        this.textarea.element.focus();
      },
      false,
    );
  }

  public resize(width: number, height: number) {
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }

  public focus() {
    this.container.focus();
  }
}
