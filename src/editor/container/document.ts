export class Document {
  constructor(
    private text?: string,
    private _storage: string[] = [],
  ) {
    this.text = text || '';
    this._storage = this.prepareText(this.text);
  }

  private prepareText(text: string) {
    let lines = [],
      index = 0,
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

  get lineCount(){
    return this._storage.length
  }

  public getLine(index: number) {
    return this._storage[index];
  }
}
