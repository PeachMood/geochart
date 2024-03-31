import { useMemo } from 'react';

import { type Domain } from 'types';

const PIXELS_PER_INCH = 96;
const CM_PER_INCH = 2.54;
const CM_PER_M = 100;

export default function useScope(domain: Domain, scope: number): number {
  const { min, max } = domain;

  const value = useMemo(() => {
    return ((max - min) * CM_PER_M * PIXELS_PER_INCH) / (scope * CM_PER_INCH);
  }, [min, max, scope]);

  return value;
}
