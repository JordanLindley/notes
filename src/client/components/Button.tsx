import { useState } from 'react';

export default function Button(props: { text: string; color: string }) {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
      style={{ backgroundColor: props.color }}
    >
      {props.text}: {count}
    </button>
  );
}
