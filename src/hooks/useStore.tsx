import { useCallback, useMemo, useState } from 'react';

export default function useStore<T>(property: keyof T) {
  const [store, setStore] = useState<T[]>([]);

  const addItem = useCallback(
    (value: T) => {
      setStore((prevState) => {
        if (prevState.some((other) => other[property] === value[property])) {
          return [...prevState];
        }
        return [...prevState, value];
      });
    },
    [property],
  );

  const deleteItem = useCallback(
    (key: T[keyof T]) => {
      setStore((prevState) => prevState.filter((value) => value[property] !== key));
    },
    [property],
  );

  const value = useMemo(() => ({ store, addItem, deleteItem }), [store, addItem, deleteItem]);

  return value;
}
