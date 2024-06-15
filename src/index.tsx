import React from 'react';
import { Editor } from './editor';

export const Text = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLTextAreaElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const selectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (
      !containerRef.current ||
      !mainRef.current ||
      !canvasRef.current ||
      !selectionRef.current
    )
      return;

    const editor = new Editor({
      container: containerRef.current,
      textarea: mainRef.current,
      canvas: canvasRef.current,
      selection: selectionRef.current,
      initialValue: 'Hello, World!',
    });

    editor.container.resize(200, 400);
    editor.container.textarea.resize(40, 20);
    editor.container.canvas.resize(200, 400, window.devicePixelRatio || 1);

    editor.container.focus();

    const a = editor.document.insertText('M\nN', 5, 1);
    console.log(editor.document.storage, a);
  }, []);

  return (
    <div ref={containerRef}>
      <textarea ref={mainRef} tabIndex={-1} />
      <canvas ref={canvasRef} />
      <div ref={selectionRef} />
    </div>
  );
};
