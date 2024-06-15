import type { Document } from './document';

export class Selection {
  private element: HTMLDivElement;
  private document: Document;

  public isVisible: boolean = false;
  public start = {
    line: 0,
    character: 0,
  };
  public end = {
    line: 0,
    character: 0,
  };

  constructor(element: HTMLDivElement, document: Document) {
    this.element = element;
    this.document = document;

    this.initialize();
  }

  private initialize() {
    this.element.style.position = 'absolute';
    this.element.style.width = '1px';
    this.element.style.height = '12px';
    this.element.style.backgroundColor = 'blue';
    this.element.style.opacity = '0';
  }

  get position() {
    return [this.end.character, this.end.line];
  }

  public setSelection(x: number, y: number) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  set visible(visible: boolean) {
    if (visible) {
      this.element.style.display = 'block';
      this.element.style.opacity = '1';
    } else {
      this.element.style.display = 'none';
    }

    this.isVisible = visible;
  }
}
