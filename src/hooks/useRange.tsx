import { useMemo } from 'react';

import { type Range, type Position } from 'types';

export default function useRange<T>(range: Range<T> = [], position: Position = 'bottom') {
  const value = useMemo(() => {
    return position === 'bottom' || position === 'left' ? range : range.reverse();
  }, [range, position]);
  return value;
}
