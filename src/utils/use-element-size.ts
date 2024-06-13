import React from 'react';

export const useElementSize = <T extends HTMLTextAreaElement>() => {
  const frameId = React.useRef(0);
  const ref = React.useRef<T>(null);

  const [rect, setRect] = React.useState({
    width: 0,
    height: 0,
  });

  const observer = React.useMemo(
    () =>
      new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const entry = entries[0];

        if (entry) {
          cancelAnimationFrame(frameId.current);

          frameId.current = requestAnimationFrame(() => {
            if (ref.current) {
              setRect(entry.contentRect);
            }
          });
        }
      }),
    [],
  );

  React.useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();

      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [ref.current]);

  return [ref, rect] as const;
};
