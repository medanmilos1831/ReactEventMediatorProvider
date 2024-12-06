import React, { useState } from 'react';
import { useSubscribe } from '../context';

export const TableWrapper = () => {
  const [counter, setCounter] = useState(0);
  useSubscribe('pera', (data: any) => {
    console.log('eeee', data, counter);
  });
  return (
    <div>
      <h2>TableWrapper</h2>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        table wrapper render {counter}
      </button>
    </div>
  );
};
