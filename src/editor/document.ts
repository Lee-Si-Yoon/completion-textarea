export class Document {
  constructor(private initialValue?: string, public storage: string[] = []) {
    this.initialValue = initialValue ?? '';
    this.storage = this.prepareText(this.initialValue);
  }

  private prepareText(text: string) {
    const lines = [];
    let index = 0,
      newIndex = 0;

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
    return this.storage[index];
  }

  public charAt(charIndex: number, line: number) {
    const currentLine = this.storage[line];
    return currentLine ? currentLine[charIndex] : undefined;
  }

  public deleteRange({
    startChar,
    startLine,
    endChar,
    endLine,
  }: {
    startChar: number;
    startLine: number;
    endChar: number;
    endLine: number;
  }) {
    const { lineCount, storage } = this;
    const start = this.getLine(startLine);
    const end = this.getLine(endLine);

    startLine = Math.max(0, startLine);
    startChar = Math.max(0, startChar);
    endLine = Math.min(endLine, lineCount - 1);
    endChar = Math.min(endChar, end?.length ?? 0);

    // append start of startLine to the remainder of endLine
    storage[startLine] = `${start?.slice(0, startChar)}${end?.slice(endChar)}`;

    // remove lines between start and end
    storage.splice(startLine + 1, endLine - startLine);

    return [startChar, startLine] as const;
  }

  /**
   * @param foward - if true, delete right
   */
  public deletChar({
    startChar,
    startLine,
    foward,
  }: {
    startChar: number;
    startLine: number;
    foward?: boolean;
  }) {
    let endChar = startChar;
    let endLine = startLine;

    if (foward) {
      const charCount = this.getLine(startLine)?.trim()?.length ?? 0;

      // if more characters after pointer simply remove one
      if (startChar < charCount) {
        ++endChar;
        // if lines after pointer, append it
      } else {
        startChar = charCount;
        if (startLine < this.lineCount - 1) {
          ++endLine;
          endChar = 0;
        }
      }
      // delete left
    } else {
      // if no characters before pointer
      if (startChar > 0) {
        --startChar;
        // if characters before, append it
      } else if (startLine > 0) {
        --startLine;
        startChar = (this.getLine(startLine)?.length ?? 0) - 1;
      }
    }

    return this.deleteRange({ startChar, startLine, endChar, endLine });
  }

  public insertText(value: string, charIndex: number, line: number) {
    const text = this.prepareText(value);

    let newCharIndex = text.at(-1)?.length || 0;
    if (text.length === 1) {
      newCharIndex += charIndex;
    }

    const currentLine = this.getLine(line);
    const remainders = {
      prev: currentLine?.slice(0, charIndex),
      value: text[0],
      next: currentLine?.slice(charIndex),
    };

    this.storage[line] =
      (remainders.prev ?? '') + (remainders.value ?? '') + remainders.next;
    this.storage.splice(line + 1, 0, ...text.slice(1));

    charIndex = newCharIndex;
    line += text.length - 1;

    return [charIndex, line] as const;
  }
}
