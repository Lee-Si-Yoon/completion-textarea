import React from 'react';
import { useElementSize } from './utils/use-element-size';

type Nullish<T> = T | null | undefined;

const noop = () => {};

export const Text = () => {
  const [value, setValue] = React.useState('');
  const [generated, setGenerated] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const controllerRef = React.useRef<AbortController>();
  const handleInput = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const { signal } = controllerRef.current;

    setLoading(true);
    const response = await fetch('https://httpbin.org/delay/1', {
      signal,
    })
      .then((res) => res.json())
      .then((json) => json.url)
      .catch(noop);

    if (response?.length) {
      setGenerated(response);
      setLoading(false);
    }
  };

  return (
    <>
      <i>{loading ? 'loading...' : 'Done!'}</i>
      <Inner
        value={value}
        setValue={setValue}
        generated={generated}
        setGenerated={setGenerated}
        placeholder="type anything..."
        onChange={handleInput}
      />
    </>
  );
};

const Inner = ({
  value,
  setValue,
  generated,
  setGenerated,
  onInput,
  onChange,
}: {
  /* TODO: support uncontrolled mode */
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  generated: Nullish<string>;
  setGenerated: React.Dispatch<React.SetStateAction<string>>;
} & Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'placeholder' | 'onChange' | 'onInput'
>) => {
  const [ref, { width, height }] = useElementSize();

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        value={value + ' ' + generated}
        onChange={noop}
        style={{
          /* TOOD: disable size synchronization if resize is none */
          width,
          height,
          position: 'absolute',
          color: '#999',
        }}
      />
      <textarea
        /* TODO: merge ref for auto focus */
        ref={ref}
        value={value}
        onChange={(e) => {
          onChange && onChange(e);
          setValue(e.currentTarget.value);
        }}
        onInput={(e) => {
          onInput && onInput(e);
          setValue(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault();

            setValue(value + ' ' + generated);
            setGenerated('');

            return false;
          }
        }}
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};
