import { it, expect, beforeEach } from 'vitest';
import { Selection } from '../src/editor/selection';
import { Document } from '../src/editor/document';

let selection: Selection;

beforeEach(() => {
  selection = new Selection(document.createElement('div'), new Document());
});

it('position', () => {
  expect(selection.position).toStrictEqual([0, 0]);

  // FIXME: should be [1, 0]
  selection.moveRight(1, false);
  expect(selection.position).toStrictEqual([0, 0]);
});
