import React from 'react';
import { Editor } from './editor';

export const Text = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLTextAreaElement>(null);
  const subRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (!containerRef.current || !mainRef.current || !subRef.current) return;

    const t = new Editor(
      containerRef.current,
      mainRef.current,
      subRef.current,
      `Hello, World!
      This is a test.`.replace(/ {2,}/g, '\n'),
    );

    console.log(t.document.storage);
  }, []);

  return (
    <div ref={containerRef}>
      <textarea ref={subRef} tabIndex={-1} />
      <textarea ref={mainRef} tabIndex={-1} />
    </div>
  );
};
