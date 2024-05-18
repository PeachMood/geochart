import { useMemo } from 'react';

import { Comparator } from 'types';

export default function useSort<T>(array: T[] = [], comparator: Comparator<T>) {
  const value = useMemo(() => {
    return [...array].sort(comparator);
  }, [array, comparator]);
  return value;
}
