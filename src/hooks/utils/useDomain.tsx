import { useMemo } from 'react';

import { type Data, type Domain, type Scale } from 'types';

const DEFAULT_MIN_VALUE = Number.MIN_SAFE_INTEGER;
const DEFAULT_MAX_VALUE = Number.MAX_SAFE_INTEGER;
const DEFAULT_POSITIVE_VALUE = 1;
const DEFAULT_LOG_OFFSET = 1;

function getDomain(data: Data): Required<Domain> {
  let min: number = data.length === 0 ? DEFAULT_MIN_VALUE : DEFAULT_MAX_VALUE;
  let max: number = data.length === 0 ? DEFAULT_MAX_VALUE : DEFAULT_MIN_VALUE;

  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    if (value === null) {
      continue;
    }

    min = Math.min(min, value);
    max = Math.max(max, value);
  }

  return { min, max };
}

function scaleLog(domain: Required<Domain>) {
  const min = domain.min < 0 ? DEFAULT_POSITIVE_VALUE : domain.min;
  const max = domain.max < 0 ? DEFAULT_POSITIVE_VALUE : domain.max;
  if (min === 0 || max === 0) {
    return { min: min + DEFAULT_LOG_OFFSET, max: max + DEFAULT_LOG_OFFSET };
  }
  return { min, max };
}

function scaleDomain(domain: Required<Domain>, scale: Scale) {
  return scale === 'linear' ? domain : scaleLog(domain);
}

export default function useDomain(domain: Domain = {}, data: Data = [], scale: Scale = 'linear'): Required<Domain> {
  const { min, max } = domain;

  const value = useMemo(() => {
    if (min && max) {
      return scaleDomain({ min, max }, scale);
    }
    const defaultDomain = getDomain(data);
    const requiredDomain = { min: min || defaultDomain.min, max: max || defaultDomain.max };
    return scaleDomain(requiredDomain, scale);
  }, [min, max, data, scale]);

  return value;
}
