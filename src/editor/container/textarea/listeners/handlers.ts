import type { Selection } from '../../../selection';
import type { Document } from '../../../document';

export const input = (
  e: InputEvent,
  selection: Selection,
  document: Document,
) => {
  const value = (e.target as unknown as { value: string }).value;

  if (!selection.isEmpty()) {
    // empty selection
  } else {
    const { position } = selection;

    // console.log(document);
    document.insertText(value, position[0], position[1]);

    console.log(document.storage);
  }
};

export const keyDown = (e: KeyboardEvent, selection: Selection) => {
  switch (e.key) {
    case 'Tab': {
      e.preventDefault();
      break;
    }

    case 'ArrowRight': {
      selection.moveRight(1, false);
      break;
    }
    case 'ArrowLeft': {
      selection.moveLeft(1, false);
      break;
    }
    case 'ArrowUp': {
      selection.moveUp(1, false);
      break;
    }
    case 'ArrowDown': {
      selection.moveDown(1, false);
      break;
    }

    default: {
      break;
    }
  }
};

export const focus = (e: FocusEvent, container: HTMLDivElement) => {
  container.style.outline = '1px solid pink';
};

export const blur = (e: FocusEvent, container: HTMLDivElement) => {
  container.style.outline = 'none';
};
