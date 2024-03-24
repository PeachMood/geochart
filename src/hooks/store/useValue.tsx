import { useState } from 'react';

export default function useValue<T>() {
  const [state, setState] = useState<T | undefined>(undefined);

  const setValue = (value: T) => {
    setState(value);
  };

  const deleteValue = () => {
    setState(undefined);
  };

  return { value: state, setValue, deleteValue };
}
