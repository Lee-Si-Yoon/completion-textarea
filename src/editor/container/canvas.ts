export class Canvas {
  private element: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.context = this.element.getContext('2d') as CanvasRenderingContext2D;

    this.initialize();
  }

  private initialize() {
    this.element.style.display = 'block';
  }

  public resize(width: number, height: number, dpr: number) {
    this.element.width = width * dpr;
    this.element.height = height * dpr;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.context.scale(dpr, dpr);
  }
}
