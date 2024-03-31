import { useMemo } from 'react';
import { scaleLinear, scaleLog } from '@visx/scale';

import { type Domain, type Scale, type Range } from 'types';

function scaleBuilder(scale: Scale) {
  switch (scale) {
    case 'logarithmic':
      return scaleLog;
    default:
      return scaleLinear;
  }
}

export default function useScale<T = number>(range: Range<T>, domain: Domain, scale: Scale = 'linear') {
  const { min, max } = domain;
  const value = useMemo(() => {
    const scaleFunction = scaleBuilder(scale);
    return scaleFunction({ range, domain: [min, max] });
  }, [range, min, max, scale]);

  return value;
}
