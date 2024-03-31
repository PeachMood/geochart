import { useCallback, useMemo, useState } from 'react';

export type Store<V> = Record<string, V[]>;

function upsertToArray<V>(array: V[], value: V, property: keyof V) {
  const copiedArray = [...array];
  const foundIndex = copiedArray.findIndex((other) => value[property] === other[property]);
  if (foundIndex === -1) {
    copiedArray.push(value);
  } else {
    copiedArray[foundIndex] = value;
  }
  return copiedArray;
}

function deleteFromArray<V>(array: V[], value: V, property: keyof V) {
  return array.filter((other) => value[property] !== other[property]);
}

export default function useStore<V>(property: keyof V, initialStore: Store<V> = {}) {
  const [store, setStore] = useState<Store<V>>(initialStore);

  const setItem = useCallback(
    (key: string, value: V) => {
      setStore((store) => {
        const copiedStore = { ...store };
        copiedStore[key] = upsertToArray(store[key] || [], value, property);
        return copiedStore;
      });
    },
    [property],
  );

  const getItem = useCallback(
    (key: string, index: number) => {
      return store[key] ? store[key][index] : undefined;
    },
    [store],
  );

  const deleteItem = useCallback(
    (key: string, value: V) => {
      setStore((store) => {
        const copiedStore = { ...store };
        copiedStore[key] = deleteFromArray(store[key] || [], value, property);
        return copiedStore;
      });
    },
    [property],
  );

  const value = useMemo(
    () => ({
      store,
      setItem,
      deleteItem,
      getItem,
    }),
    [store, setItem, getItem, deleteItem],
  );

  return value;
}
