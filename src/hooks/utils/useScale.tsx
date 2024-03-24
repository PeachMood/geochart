import { useMemo } from 'react';
import { scaleLinear, scaleLog } from '@visx/scale';

import { type Range, type Domain, type Scale } from 'types';

const DEFAULT_DOMAIN_VALUE = 1;
const DEFAULT_RANGE_VALUE = 0;

function scaleBuilder(scale: Scale) {
  switch (scale) {
    case 'logarithmic':
      return scaleLog;
    default:
      return scaleLinear;
  }
}

export default function useScale(range: Range, domain: Domain = {}, scale: Scale = 'linear') {
  const { start = DEFAULT_RANGE_VALUE, end = DEFAULT_RANGE_VALUE } = range;
  const { min = DEFAULT_DOMAIN_VALUE, max = DEFAULT_DOMAIN_VALUE } = domain;
  const value = useMemo(() => {
    const scaleFunction = scaleBuilder(scale);
    return scaleFunction({
      range: [start, end],
      domain: [min, max],
    });
  }, [start, end, min, max, scale]);

  return value;
}
