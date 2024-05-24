import { Orientation } from 'types';

import { DEFAULT_ORIENTATION, OFFSET_PERCENT_FACTOR } from './constants';

export function getOffset(position: number) {
  return `${position * OFFSET_PERCENT_FACTOR}%`;
}

export function isVertical(orientation: Orientation = DEFAULT_ORIENTATION) {
  return orientation === 'vertical';
}
