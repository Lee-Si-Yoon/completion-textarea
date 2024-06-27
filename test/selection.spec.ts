import { it, expect, beforeEach } from 'vitest';
import { Selection } from '../src/editor/selection';
import { Document } from '../src/editor/document';

let selection: Selection;

beforeEach(() => {
  selection = new Selection(
    document.createElement('div'),
    new Document('Line1\nLine2\nLine3')
  );
});

it('move direction', () => {
  expect(selection.position).toStrictEqual([0, 0]);

  selection.moveRight(1);
  expect(selection.position).toStrictEqual([1, 0]);

  selection.moveLeft(1);
  expect(selection.position).toStrictEqual([0, 0]);

  selection.moveDown(2);
  expect(selection.position).toStrictEqual([0, 2]);

  selection.moveUp(1);
  expect(selection.position).toStrictEqual([0, 1]);
});
