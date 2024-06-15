import { input, keyDown, focus, blur } from './handlers';

export class Listeners {
  private container: HTMLDivElement;
  private element: HTMLTextAreaElement;

  constructor(textarea: HTMLTextAreaElement, container: HTMLDivElement) {
    this.container = container;
    this.element = textarea;
  }

  public register() {
    this.element.addEventListener('input', this.input.bind(this));
    this.element.addEventListener('blur', this.blur.bind(this));
    this.element.addEventListener('focus', this.focus.bind(this));
    this.element.addEventListener('keydown', this.keyDown.bind(this));
  }

  public input(_e: Event) {
    const e = _e as InputEvent;
    input(e);
  }
  public keyDown(_e: Event) {
    const e = _e as KeyboardEvent;
    keyDown(e);
  }
  public blur(_e: Event) {
    const e = _e as FocusEvent;
    blur(e, this.container);
  }
  public focus(_e: Event) {
    const e = _e as FocusEvent;
    focus(e, this.container);
  }
}
