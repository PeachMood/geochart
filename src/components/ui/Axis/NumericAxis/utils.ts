import { type Range, type Position, type Color } from 'types';

import { type NumericAxisDefaults as Axis } from './NumericAxis';

function getIndexRange(position: Position, length: number): Range<number> {
  const range = [0, length - 1];
  return position === 'bottom' || position === 'left' ? range : range.reverse();
}

export function tickLabelProps(axis: Axis, ticks: number[], position: Position, color?: Color) {
  const range = getIndexRange(position, ticks.length);
  return (_: unknown, index?: number) => ({
    fill: color,
    textAnchor: (index === range[0] ? 'start' : index === range[1] ? 'end' : 'middle') as any,
    ...axis.tickLabelProps,
  });
}
