export class Document {
  constructor(
    private text?: string,
    private _storage: string[] = [],
  ) {
    this.text = text || '';
    this._storage = this.prepareText(this.text);
  }

  private prepareText(text: string) {
    const lines = [];
    let index = 0,
      newIndex: number = 0;

    while (newIndex !== -1) {
      newIndex = text.indexOf('\n', index);
      lines.push(text.slice(index, newIndex));
      index = newIndex + 1;
    }

    return lines;
  }

  get storage() {
    return this._storage;
  }

  get lineCount() {
    return this._storage.length;
  }

  public getLine(index: number) {
    return this._storage[index];
  }

  public insertText(text: string, charIndex: number, line: number) {
    if (this.storage[line] === undefined) {
      throw new Error('Invalid line');
    }

    const parsedText = this.prepareText(text);
    const lastLine = parsedText.at(-1) as string;

    let newColumn = lastLine.length || 0;
    parsedText.length === 1 && (newColumn += charIndex);

    this.storage[line] =
      (this.storage[line] as string).substring(0, charIndex) + parsedText[0];
    this.storage.splice(line + 1, 0, ...parsedText.slice(1));
  }
}
