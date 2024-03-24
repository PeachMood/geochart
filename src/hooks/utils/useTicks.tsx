import { useMemo } from 'react';

import { type Ticks, type Scale, type GridType as Type } from 'types';

const FLOAT_FACTOR = 1.0;
const DEFAULT_LINES_NUMBER = 1;
const DEFAULT_LOG_STEP = 10;

function stepLinear(min: number, max: number, interval?: number, lines?: number) {
  if (interval && !lines) {
    return interval;
  }
  if (!interval && lines) {
    return ((max - min) * FLOAT_FACTOR) / (lines + 1);
  }
  if (interval && lines) {
    return interval / (lines + 1);
  }
  return max - min;
}

function tickLinear(ticks: Ticks) {
  const { domain, lines, interval } = ticks;
  const { min, max } = domain;
  const step = stepLinear(min, max, interval, lines);
  return Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step);
}

function stepUniformLog(min: number, max: number, lines: number) {
  return (max / min) ** (1 / (lines + 1));
}

function tickUniformLog(ticks: Ticks) {
  const { domain, lines = DEFAULT_LINES_NUMBER } = ticks;
  const { min, max } = domain;
  const step = stepUniformLog(min, max, lines);

  let value = min;
  const array = [];
  for (let index = 0; index < lines + 2; ++index) {
    array.push(value);
    value *= step;
  }
  return array;
}

function tickLog(ticks: Ticks, type?: Type) {
  const { min, max } = ticks.domain;
  const start = Math.floor(Math.log10(min));
  const end = Math.ceil(Math.log10(max));

  let value = 1;
  const array = [];
  for (let power = start; power < end; ++power) {
    array.push(value);
    if (type === 'secondary') {
      for (let index = 2; index < 10; ++index) {
        array.push(index * value);
      }
    }
    value *= DEFAULT_LOG_STEP;
  }
  array.push(value);
  return array;
}

function ticksBuilder(scale: Scale, type: Type) {
  switch (scale) {
    case 'linear':
      return tickLinear;
    case 'logarithmic':
      return type === 'uniform' ? tickUniformLog : tickLog;
    default:
      return tickLinear;
  }
}

export default function useTicks(ticks: Ticks, scale: Scale = 'linear', type: Type = 'uniform') {
  const { domain, interval, lines } = ticks;
  const { min, max } = domain;

  const value = useMemo(() => {
    const ticks = { domain: { min, max }, interval, lines };
    const tickFunction = ticksBuilder(scale, type);
    return tickFunction(ticks, type);
  }, [min, max, interval, lines, scale, type]);

  return value;
}
