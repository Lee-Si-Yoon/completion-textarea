import { Container } from './container';
import { Document } from './container/document';

export class Editor {
  private _document: Document;
  private _container: Container;

  constructor(
    container: HTMLDivElement,
    main: HTMLTextAreaElement,
    sub: HTMLTextAreaElement,
    initialValue?: string,
  ) {
    this._document = new Document(initialValue);
    this._container = new Container(this._document, container, main, sub);
  }

  get document() {
    return this._document;
  }

  get container() {
    return this._container;
  }
}
