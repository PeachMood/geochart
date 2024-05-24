import { useMemo } from 'react';
import { type Data, type Domain, type Scale } from 'types';

const DEFAULT_MIN_VALUE = Number.MIN_SAFE_INTEGER;
const DEFAULT_MAX_VALUE = Number.MAX_SAFE_INTEGER;
const DEFAULT_POSITIVE_VALUE = 1;

function getDomain(data: Data): Required<Domain> {
  if (data.length === 0) {
    return { min: DEFAULT_MIN_VALUE, max: DEFAULT_MAX_VALUE };
  }

  let min = DEFAULT_MAX_VALUE;
  let max = DEFAULT_MIN_VALUE;

  data.forEach((value) => {
    if (value !== null) {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  });

  return { min, max };
}

function scaleLog(domain: Required<Domain>): Required<Domain> {
  const min = domain.min <= 0 ? DEFAULT_POSITIVE_VALUE : domain.min;
  const max = domain.max <= 0 ? DEFAULT_POSITIVE_VALUE : domain.max;

  return { min, max };
}

function scaleDomain(domain: Required<Domain>, scale: Scale): Required<Domain> {
  return scale === 'linear' ? domain : scaleLog(domain);
}

export default function useDomain(domain: Domain = {}, data: Data = [], scale: Scale = 'linear'): Required<Domain> {
  const { min, max } = domain;

  const value = useMemo(() => {
    if (min !== undefined && max !== undefined) {
      return scaleDomain({ min, max }, scale);
    }

    const defaultDomain = getDomain(data);
    const fullDomain = {
      min: min ?? defaultDomain.min,
      max: max ?? defaultDomain.max,
    };

    return scaleDomain(fullDomain, scale);
  }, [min, max, data, scale]);

  return value;
}
