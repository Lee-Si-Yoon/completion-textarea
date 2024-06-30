import { it, expect, beforeEach } from 'vitest';
import { Document } from '../src/editor/document';

const testText = 'Line1\n\nLine3\nLine4';

let doc: Document;

beforeEach(() => {
  doc = new Document(testText);
});

it('getLine', () => {
  expect(doc.lineCount).toBe(4);

  expect(doc.getLine(0)).toStrictEqual('Line1\n');
  expect(doc.getLine(1)).toStrictEqual('\n');
  expect(doc.getLine(2)).toStrictEqual('Line3\n');
  expect(doc.getLine(3)).toStrictEqual('Line4');
});

it('charAt', () => {
  expect(doc.charAt(0, 0)).toBe('L');
  expect(doc.charAt(4, 2)).toEqual('3');
});

it('delete one character right', () => {
  doc.deletChar({ startChar: 0, startLine: 0, foward: true });
  expect(doc.getLine(0)).toStrictEqual('ine1\n');

  // delete line break
  doc.deletChar({ startChar: 5, startLine: 0, foward: true });
  expect(doc.getLine(0)).toStrictEqual('ine1\n');
  doc.deletChar({ startChar: 5, startLine: 0, foward: true });
  expect(doc.getLine(0)).toStrictEqual('ine1Line3\n');
});

it('delete one character left', () => {
  doc.deletChar({ startChar: 2, startLine: 3, foward: false });
  expect(doc.getLine(3)).toStrictEqual('Lne4');

  // delete line break
  doc.deletChar({ startChar: 0, startLine: 3, foward: false });
  expect(doc.getLine(2)).toStrictEqual('Line3Lne4');

  // outside bounds
  doc.deletChar({ startChar: 6, startLine: 3, foward: false });
  expect(doc.getLine(2)).toStrictEqual('Line3Lne4');

  // first character
  doc.deletChar({ startChar: 0, startLine: 0, foward: false });
  expect(doc.getLine(0)).toStrictEqual('Line1\n');
});

it('delete range', () => {
  // delete 'ne3\nL' from 'Line1\n\nLine3\nLine4'
  doc.deleteRange({ startChar: 2, startLine: 2, endChar: 1, endLine: 3 });
  expect(doc.getLine(2)).toEqual('Liine4');
});

it('insert text', () => {
  const newPosition = doc.insertText('\nLine5', 0, doc.lineCount - 1);

  expect(doc.getLine(doc.lineCount - 1)).toStrictEqual('Line5');
  expect(newPosition).toStrictEqual([5, doc.lineCount - 1]);

  doc.insertText('6', doc.getLine(doc.lineCount - 1).length, doc.lineCount - 1);
  expect(doc.getLine(doc.lineCount - 1)).toStrictEqual('Line56');
});
