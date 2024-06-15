export class Document {
  public storage: string[] = [];
  public text: string;

  constructor(text?: string) {
    this.text = text || '';
    this.storage = this.prepareText(this.text);
  }

  private prepareText(text: string) {
    const lines = [];
    let index = 0;
    let newIndex: number = 0;

    while (newIndex !== -1) {
      newIndex = text.indexOf('\n', index);

      if (newIndex === -1) {
        lines.push(text.slice(index));
      } else {
        lines.push(text.slice(index, newIndex));
      }

      index = newIndex + 1;
    }

    return lines;
  }

  get lineCount() {
    return this.storage.length;
  }

  get length() {
    let sum = 0;

    for (let i = this.storage.length - 1; i >= 0; i--) {
      sum += this.storage[i]?.length || 0;
    }

    return sum;
  }

  public getLine(index: number) {
    return this.storage[index];
  }

  public charAt(column: number, row: number) {
    const _row = this.storage[row];

    if (_row !== undefined) {
      return _row.charAt(column);
    }

    return undefined;
  }

  public insertText(text: string, column: number, row: number) {
    const line = this.storage[row];
    if (!line) return;

    const updatedLine = line.slice(0, column) + text + line.slice(column);
    this.storage[row] = updatedLine;

    return [column + text.length, row];
  }
}
