import type { Selection } from '../../../selection';
import type { Document } from '../../../document';

const deleteCharAtCurrentPosition = ({
  selection,
  document,
  foward,
}: {
  selection: Selection;
  document: Document;
  foward?: boolean;
}) => {
  if (!selection.isEmpty()) {
    const { start, end } = selection;
    const newPosition = document.deleteRange(
      start.character,
      start.line,
      end.character,
      end.line,
    );
    selection.setPosition(newPosition[0], newPosition[1]);
  } else {
    const { position } = selection;
    const newPosition = document.deletChar(position[0], position[1], foward);
    selection.setPosition(newPosition[0], newPosition[1]);
  }
};

const insertTextAtCurrentPosition = ({
  value,
  document,
  selection,
}: {
  value: string;
  document: Document;
  selection: Selection;
}) => {
  if (!selection.isEmpty()) {
    deleteCharAtCurrentPosition({ selection, document });
  }

  const { position } = selection;
  const newPosition = document.insertText(value, position[0], position[1]);

  selection.setPosition(newPosition[0], newPosition[1]);
};

export const input = (
  e: InputEvent,
  selection: Selection,
  document: Document,
) => {
  // TODO: handle event type and value
  const _value = (e.target as unknown as { value: string }).value;
  const value = _value.at(-1);
  if (!value) return;

  insertTextAtCurrentPosition({ selection, document, value });

  console.log(selection.position, document.storage);
};

export const keyDown = (
  e: KeyboardEvent,
  selection: Selection,
  document: Document,
) => {
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
    case 'Backspace': {
      // FIXME: backspace is not working
      deleteCharAtCurrentPosition({ selection, document, foward: false });
      break;
    }
    case 'Delete': {
      deleteCharAtCurrentPosition({ selection, document, foward: true });
      break;
    }
    case 'Enter': {
      insertTextAtCurrentPosition({ selection, document, value: '\n' });
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
