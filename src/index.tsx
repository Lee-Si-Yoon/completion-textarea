import React from 'react';

type Nullish<T> = T | null | undefined;

const noop = () => {};
const delay = <T,>(time: number, value: T): Promise<T> =>
  new Promise((res) => setTimeout(() => res(value), time));

const getMockData = async () => {
  const data = await delay(1000, 'done');

  return data;
};

export const Text = () => {
  const [value, setValue] = React.useState('');
  const [generated, setGenerated] = React.useState('');

  return (
    <Inner
      value={value}
      setValue={setValue}
      generated={generated}
      setGenerated={setGenerated}
      placeholder="type anything..."
      onInput={async () => {
        const data = await getMockData();

        setGenerated(data);
      }}
    />
  );
};

const Inner = ({
  value,
  setValue,
  generated,
  setGenerated,
  ...props
}: {
  /* TODO: support uncontrolled mode */
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  generated?: Nullish<string>;
  setGenerated?: React.Dispatch<React.SetStateAction<string>>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div style={{ position: 'relative' }}>
      <textarea
        value={value + ' ' + generated}
        onChange={noop}
        style={{
          border: '1px solid red',
          position: 'absolute',
          color: '#999',
          width: '100%',
          resize: 'none',
        }}
      />
      <textarea
        {...props}
        value={value}
        onInput={(e) => {
          setValue(e.currentTarget.value);
          props.onInput && props.onInput(e);
        }}
        onKeyDown={(e) => {
          /* TODO: focus trap */
          if (e.key === 'Tab') {
            setValue(value + ' ' + generated);
            setGenerated && setGenerated('');
          }
        }}
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          width: '100%',
          resize: 'none',
        }}
      />
    </div>
  );
};
