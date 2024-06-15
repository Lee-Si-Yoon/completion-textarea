import { Container } from './container';
import { Selection } from './selection';
import { Document } from './document';

export class Editor {
  public document: Document;
  public container: Container;
  public selection: Selection;

  constructor({
    container,
    textarea,
    canvas,
    selection,
    initialValue,
  }: {
    container: HTMLDivElement;
    textarea: HTMLTextAreaElement;
    canvas: HTMLCanvasElement;
    selection: HTMLDivElement;
    initialValue?: string;
  }) {
    this.document = new Document(initialValue);
    this.container = new Container(container, textarea, canvas);
    this.selection = new Selection(selection, this.document);

    this.selection.visible = true;
    this.selection.setSelection(10, 10);
  }
}
