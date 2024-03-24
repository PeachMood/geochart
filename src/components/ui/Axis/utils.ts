import { type Color } from 'types';

import { type AxisDefaults } from './Axis';
import { TextAnchorType } from 'victory';

export function tickLabelProps(axis: AxisDefaults, length: number, color?: Color) {
  return (_: unknown, index?: number) => ({
    fill: color,
    textAnchor: (index === 0 ? 'start' : index === length - 1 ? 'end' : 'middle') as TextAnchorType,
    ...axis.tickLabelProps,
  });
}

//
