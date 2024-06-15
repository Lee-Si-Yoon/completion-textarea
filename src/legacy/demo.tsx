import React from 'react';
import { Text } from '..';

const noop = () => {};

const Demo = () => {
  const [value, setValue] = React.useState('');
  const [generated, setGenerated] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const controllerRef = React.useRef<AbortController>();
  const handleInput = async () => {
    if (controllerRef.current || !value.length) {
      controllerRef.current?.abort();
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
      <Text
      // value={value}
      // setValue={setValue}
      // generated={generated}
      // setGenerated={setGenerated}
      // placeholder="type anything..."
      // onChange={handleInput}
      />
    </>
  );
};

export default Demo;
