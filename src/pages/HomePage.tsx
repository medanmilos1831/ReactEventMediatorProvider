import axios from 'axios';
import { useQueryObserver } from '../observer-query-react';
import { useState } from 'react';
export default function HomePage() {
  const [counter, setCounter] = useState(0);
  const query = useQueryObserver({
    name: 'pera',
    queryPromise() {
      return axios.get(
        counter === 0
          ? `https://api.escuelajs.co/api/v1/users`
          : `https://api.escuelajs.co/api/v1/users/${counter}`
      );
    },
    dependencies: [counter],
  });
  console.log('query', query);
  return (
    <div>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        click me {counter}
      </button>
    </div>
  );
}
