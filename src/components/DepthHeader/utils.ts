import { type Orientation, type Size, type Text } from 'types';
import { type Depth } from './DepthHeader';

const createTextObject = (value?: string, color?: string): Text => ({ value, color });

export const getAdjustedSize = (width: number, height: number, orientation: Orientation): Size => {
  return orientation === 'vertical' ? { width, height } : { width: height, height: width };
};

export const getDepthAxisText = (depth: Depth): Text[] => {
  const text = [
    createTextObject(depth.main.name, depth.main.color),
    createTextObject(`(${depth.units})`, depth.main.color),
    createTextObject(`1:${depth.scope}`, depth.main.color),
  ];

  if (depth.secondary) {
    return [text[0], createTextObject(depth.secondary.name, depth.secondary.color), ...text.slice(1)];
  }

  return text;
};

export const getPosition = (start: number, step: number, index: number): number => {
  return start + index * step;
};
