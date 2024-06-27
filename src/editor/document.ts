import { assert } from '../utils';

export class Document {
  constructor(
    private initialValue?: string,
    public storage: string[] = [],
  ) {
    this.initialValue = initialValue || '';
    this.storage = this.prepareText(this.initialValue);
  }

  private prepareText(text: string) {
    const lines = [];
    let index = 0,
      newIndex: number = 0;

    while (newIndex !== -1) {
      newIndex = text.indexOf('\n', index);
      lines.push(text.slice(index, newIndex !== -1 ? newIndex + 1 : undefined));
      index = newIndex + 1;
    }

    return lines;
  }

  get lineCount() {
    return this.storage.length;
  }

  public getLine(index: number) {
    const line = this.storage[index];
    assert(line !== undefined, 'Unapproachable line');

    return line;
  }

  public charAt(charIndex: number, line: number) {
    const currentLine = this.getLine(line);
    const char = currentLine[charIndex];
    assert(char !== undefined, 'Unapproachable char');

    return char;
  }

  public deleteRange(
    startCharIndex: number,
    startLine: number,
    endCharIndex: number,
    endLine: number,
  ) {
    const { lineCount, storage } = this;
    const start = this.getLine(startLine);
    const end = this.getLine(endLine);

    startCharIndex = Math.max(0, startCharIndex);
    startLine = Math.max(0, startLine);
    endLine = Math.min(endLine, lineCount - 1);
    endCharIndex = Math.min(endCharIndex, end.length - 1);

    storage[startLine] =
      start.slice(0, startCharIndex) + end.slice(endCharIndex + 1);
    storage.splice(startLine + 1, endLine - startLine);

    return [startCharIndex, startLine] as const;
  }

  public deletChar(
    startCharIndex: number,
    startLine: number,
    foward?: boolean,
  ) {
    const { lineCount } = this;
    const currentLine = this.getLine(startLine);
    let endLine = startLine;
    let endCharIndex = startCharIndex;

    if (foward) {
      const charCount = currentLine.length;

      if (startCharIndex < charCount) {
        ++endCharIndex;
      } else {
        startCharIndex = charCount;
        if (startLine < lineCount - 1) {
          ++endLine;
          endCharIndex = 0;
        }
      }
    } else {
      if (startCharIndex > 0) {
        --startCharIndex;
      } else if (startLine > 0) {
        --startLine;
        startCharIndex = this.getLine(startLine).length - 1;
      }
    }

    return this.deleteRange(startCharIndex, startLine, endCharIndex, endLine);
  }

  public insertText(value: string, charIndex: number, line: number) {
    const text = this.prepareText(value);

    let newCharIndex = text.at(-1)?.length || 0;
    if (text.length === 1) {
      newCharIndex += charIndex;
    }

    const currentLine = this.getLine(line);
    const remainders = {
      prev: currentLine.slice(0, charIndex),
      value: text[0],
      next: currentLine.slice(charIndex),
    };

    this.storage[line] = remainders.prev + remainders.value + remainders.next;
    this.storage.splice(line + 1, 0, ...text.slice(1));

    charIndex = newCharIndex;
    line += text.length - 1;

    return [charIndex, line] as const;
  }
}
