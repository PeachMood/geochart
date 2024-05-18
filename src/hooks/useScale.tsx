import { useMemo } from 'react';
import { scaleLinear, scaleLog } from '@visx/scale';

import { type Range, type Scale, type Domain } from 'types';

function scaleBuilder(scale: Scale) {
  switch (scale) {
    case 'logarithmic':
      return scaleLog;
    default:
      return scaleLinear;
  }
}

export default function useScale<Type = number>(range: Range<Type>, domain: Domain = {}, ticks: Array<number> = [], scale: Scale = 'linear') {
  const { min, max } = domain;
  const value = useMemo(() => {
    const scaleFunction = scaleBuilder(scale);
    const domain = min !== undefined && max !== undefined ? [min, max] : ticks;
    return scaleFunction({ range, domain });
  }, [range, min, max, ticks, scale]);

  return value;
}
