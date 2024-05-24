import { useMemo } from 'react';

import { type Accessor } from 'types';

export default function useMap<T, S>(array: Array<T> = [], accessor: Accessor<T, S>) {
  const value = useMemo(() => array.map(accessor), [array, accessor]);
  return value;
}
