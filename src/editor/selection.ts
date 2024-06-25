import type { Document } from './document';

type Select = {
  line: number;
  character: number;
};

export class Selection {
  private element: HTMLDivElement;
  private document: Document;
  // is manipulating at right side of selection
  private activeEndSide: boolean = true;

  public isVisible: boolean = false;
  public start: Select = {
    line: 0,
    character: 0,
  };
  public end: Select = {
    line: 0,
    character: 0,
  };

  constructor(element: HTMLDivElement, document: Document) {
    this.element = element;
    this.document = document;

    this.setPosition(0, 0);
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
    if (this.activeEndSide) {
      return [this.end.character, this.end.line] as const;
    } else {
      return [this.start.character, this.start.line] as const;
    }
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

  private comparePosition(prev: Select, next: Select) {
    if (prev.line < next.line) {
      return -1;
    } else if (prev.line > next.line) {
      return 1;
    } else {
      if (prev.character < next.character) {
        return -1;
      } else if (prev.character > next.character) {
        return 1;
      }
      return 0;
    }
  }

  public isEmpty() {
    return this.comparePosition(this.start, this.end) === 0;
  }

  private forceBounds(character: number, line: number) {
    const { position } = this;
    line = Math.max(line, 0);

    if (character < 0) {
      if (line === position[1] && line > 0) {
        --line;
        character = this.document.getLine(line).length;
      } else {
        character = 0;
      }
    }

    const lineCount = this.document.lineCount;
    const characterCount = this.document.getLine(line).length;
    line = Math.max(line, lineCount - 1);

    if (character > characterCount) {
      if (line === position[1] && line < lineCount - 1) {
        ++line;
        character = 0;
      } else {
        character = characterCount;
      }
    }

    return [character, line] as const;
  }

  // TODO: call on input change & apply font metrics
  public updateCursorStyle({
    scrollLeft,
    scrollTop,
  }: {
    scrollLeft: number;
    scrollTop: number;
  }) {
    const { position } = this;
    const offsetX = position[0] - scrollLeft;
    const offsetY = position[1] - scrollTop;

    this.element.style.left = `${offsetX}px`;
    this.element.style.top = `${offsetY * 12}px`;
  }

  private doSetPosition(
    character: number,
    line: number,
    keepSelection?: boolean,
  ) {
    if (keepSelection) {
      const compare = this.comparePosition({ line, character }, this.start);

      if (compare === -1 && (this.isEmpty() || line < this.start.line)) {
        this.activeEndSide = false;
      }

      if (this.activeEndSide) {
        this.end.line = line;
        this.end.character = character;
      } else {
        this.start.line = line;
        this.start.character = character;
      }
    } else {
      this.activeEndSide = true;
      this.start.line = this.end.line = line;
      this.start.character = this.end.character = character;
    }
  }

  public setPosition(character: number, line: number, keepSelection?: boolean) {
    const position = this.forceBounds(character, line);

    this.doSetPosition(position[0], position[1], keepSelection);
  }

  public moveUp(length: number, keepSelection: boolean) {
    length || (length = 1);
    const position = this.position;
    this.setPosition(position[0], position[1] - length, keepSelection);
  }

  public moveDown(length: number, keepSelection: boolean) {
    length || (length = 1);
    const position = this.position;
    this.setPosition(position[0], position[1] + length, keepSelection);
  }

  public moveLeft(length: number, keepSelection: boolean) {
    length || (length = 1);
    const position = this.position;
    this.setPosition(position[0] - length, position[1], keepSelection);
  }

  public moveRight(length: number, keepSelection: boolean) {
    length || (length = 1);
    const position = this.position;
    this.setPosition(position[0] + length, position[1], keepSelection);
  }
}
