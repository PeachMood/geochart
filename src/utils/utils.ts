import { scaleLinear, scaleLog } from '@visx/scale';

import { type Data, type DepthAxis, type Domain, type Orientation, type Scale, type Size, type Text } from 'utils/types';
import { defaultLeftAxis, defaultTopAxis } from 'utils/constants';

export function groupBy<T>(key: keyof T, array: T[]) {
  return array.reduce<Record<string, T[]>>((group, item) => {
    const value = item[key] as string;
    group[value] = group[value] ?? [];
    group[value].push(item);
    return group;
  }, {});
}

export const getAdjustedSize = (width: number, height: number, orientation: Orientation): Size => {
  return orientation === 'vertical' ? { width, height } : { width: height, height: width };
};

const removeNulls = (data: Data): number[] => {
  return data.filter((value): value is number => value !== null);
};

export const getDomain = (data: Data): Required<Domain> => {
  const cleanData = removeNulls(data);

  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < data.length; i++) {
    if (cleanData[i] < min) {
      min = cleanData[i];
    }
    if (cleanData[i] > max) {
      max = cleanData[i];
    }
  }

  return { min, max };
};

export const getLabelPosition = (index: number, length: number, orientation: Orientation) => {
  if (orientation === 'vertical') {
    return index === 0 ? 'end' : index === length - 1 ? 'start' : 'middle';
  }
  return index === 0 ? 'start' : index === length - 1 ? 'end' : 'middle';
};

export const range = (start: number, stop: number, step: number) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
};

export const tickLinear = (domain: Domain) => {
  const { min = 0, max = Number.MAX_SAFE_INTEGER } = domain;
  const avg = (min + max) / 2;
  return [min, avg, max];
};

export const tickLog = (domain: Domain) => {
  const { min = 1, max = Number.MAX_SAFE_INTEGER } = domain;
  const minLog = Math.log10(min);
  const maxLog = Math.log10(max);
  const avgLog = (minLog + maxLog) / 2;
  return [minLog, avgLog, maxLog].map((power) => Math.pow(10, power));
};

export const scaleBuilder = (scale: Scale) => {
  return scale === 'logarithmic' ? scaleLog : scaleLinear;
};

export const ticksBuilder = (scale: Scale) => {
  return scale === 'logarithmic' ? tickLog : tickLinear;
};

export const axisBuilder = (orientation: Orientation) => {
  return orientation === 'horizontal' ? defaultLeftAxis : defaultTopAxis;
};

export const getDepthAxisText = (depthAxis: DepthAxis): Text[] => {
  const text = [
    { value: depthAxis.main.name, color: depthAxis.main.color },
    { value: `(${depthAxis.units})`, color: depthAxis.main.color },
    { value: `1:${depthAxis.scope}`, color: depthAxis.main.color },
  ];

  if (depthAxis.secondary) {
    text.splice(1, 0, { value: depthAxis.secondary.name, color: depthAxis.secondary.color });
  }

  return text;
};

export const getPosition = (start: number, step: number, index: number): number => {
  return start + index * step;
};
