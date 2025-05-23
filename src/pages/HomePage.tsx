import axios from 'axios';
import { useQueryObserver } from '../observer-query-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
export default function HomePage() {
  const [counter, setCounter] = useState(0);
  const [pera, setPera] = useState(0);
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
    config: {
      enabled: pera === 1,
    },
  });
  // const query = useQuery(
  //   ['eee', counter],
  //   () => {
  //     return axios.get(
  //       counter === 0
  //         ? `https://api.escuelajs.co/api/v1/users`
  //         : `https://api.escuelajs.co/api/v1/users/${counter}`
  //     );
  //   },
  //   {
  //     enabled: pera === 3,
  //   }
  // );
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

      <button
        onClick={() => {
          setPera((prev) => prev + 1);
        }}
      >
        update pera {pera}
      </button>
    </div>
  );
}
