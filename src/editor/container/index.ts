import { Textarea } from './textarea';
import { Canvas } from './canvas';

export class Container {
  public textarea: Textarea;
  public canvas: Canvas;
  public container: HTMLDivElement;

  constructor(
    container: HTMLDivElement,
    textarea: HTMLTextAreaElement,
    canvas: HTMLCanvasElement,
  ) {
    this.container = container;
    this.textarea = new Textarea(textarea, this.container);
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
