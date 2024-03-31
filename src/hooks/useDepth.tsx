import { useMemo } from 'react';

import { type Depth, type Domain, type Ticks } from 'types';

const DEFAULT_DOMAIN_VALUE = 0;
const FLOAT_FACTOR = 1.0;

function getDomain(depth: Depth = []): Domain {
  const min: number = depth[0] || DEFAULT_DOMAIN_VALUE;
  const max: number = depth[depth.length - 1] || DEFAULT_DOMAIN_VALUE;
  return { min, max };
}

function getInterval(domain: Domain, length: number): number {
  const { min, max } = domain;
  return ((max - min) * FLOAT_FACTOR) / length;
}

export default function useDepth(depth: Depth = []): Ticks {
  const value = useMemo(() => {
    const domain = getDomain(depth);
    const interval = getInterval(domain, depth.length);
    return { domain, interval };
  }, [depth]);
  return value;
}
