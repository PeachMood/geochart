import { useMemo } from 'react';

import { type ModelData, type Ticks, type Domain, ModelValue } from 'types';
import useSort from './useSort';

const DEFAULT_INTERVAL = 10;
const DEGREES_PER_RADIANS = Math.PI / 180;

function compareByVector(a: ModelValue, b: ModelValue): number {
  return a.x - b.x;
}

function getInRadians(angle: number) {
  return angle * DEGREES_PER_RADIANS;
}

function generateYRo(data: ModelData, domain: Domain, interval: number = DEFAULT_INTERVAL) {
  const { min, max } = domain;
  const y: number[] = [];
  const ro: { up: number; down: number }[] = [];
  if (data.length === 0) {
    return { y, ro };
  }
  let index = 0;
  for (let x = min; x <= max; x += interval) {
    if (index + 1 < data.length && data[index + 1].x < x) {
      index += 1;
    }
    const model = data[index];
    const alpha = getInRadians(model.alpha);
    y.push(model.y + (x - model.x) * alpha);
    ro.push({ up: model.roUp, down: model.roDown });
  }
  return { y, ro };
}

function generateX(data: ModelData) {
  const x = data.map((model) => model.x);
  return x;
}

export default function useModel(data: ModelData = [], depth: Ticks) {
  const sorted = useSort<ModelValue>(data, compareByVector);
  const { domain, interval } = depth;
  const { min, max } = domain;

  const value = useMemo(() => {
    const domain = { min, max };
    const { y, ro } = generateYRo(sorted, domain, interval);
    const x = generateX(sorted);
    return { x, y, ro };
  }, [sorted, interval, min, max]);
  return value;
}
