import { it, expect, beforeEach } from 'vitest';
import { Document } from '../src/editor/document';

const testText = 'Line1\n\nLine3\nLine4';

let doc: Document;

beforeEach(() => {
  doc = new Document(testText);
});

it('getLine', () => {
  expect(doc.lineCount).toBe(4);

  // FIXME: \n should be removed
  expect(doc.getLine(0)).toStrictEqual('Line1\n');
  expect(doc.getLine(1)).toStrictEqual('\n');
  expect(doc.getLine(2)).toStrictEqual('Line3\n');
  expect(doc.getLine(3)).toStrictEqual('Line4');
  expect(() => doc.getLine(4)).toThrow();
});

it('charAt', () => {
  expect(doc.charAt(0, 0)).toBe('L');
  expect(doc.charAt(4, 2)).toEqual('3');
  expect(() => doc.charAt(100, 2)).toThrow();
});

it('insert text', () => {
  const newPosition = doc.insertText('\nLine5', 5, doc.lineCount - 1);

  expect(doc.getLine(doc.lineCount - 1)).toStrictEqual('Line5');
  expect(newPosition).toStrictEqual([5, doc.lineCount - 1]);

  doc.insertText('6', doc.getLine(doc.lineCount - 1).length, doc.lineCount - 1);
  expect(doc.getLine(doc.lineCount - 1)).toStrictEqual('Line56');
});

it('delete line', () => {
  const newPosition = doc.deleteRange(0, 0, 4, 0);

  expect(doc.getLine(0)).toStrictEqual('\n');
  expect(newPosition).toStrictEqual([0, 0]);
});

it('delete range', () => {
  const newPosition = doc.deleteRange(0, 0, 4, 1);

  // FIXME: getline(0) should return 'Line3\n'
  expect(doc.getLine(1)).toStrictEqual('Line3\n');
  expect(newPosition).toStrictEqual([0, 0]);
});

it('delet char', () => {
  const newPosition = doc.deletChar(0, 0, false);

  expect(doc.getLine(0)).toStrictEqual('ine1\n');
  expect(newPosition).toStrictEqual([0, 0]);

  // FIXME: deleting 2 char
  doc.deletChar(1, 1, true);
  expect(doc.getLine(1)).toStrictEqual('\nine3\n');
});
