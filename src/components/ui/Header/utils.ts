import { type AxisProps } from 'components/ui/Axis';
import { Store } from 'hooks/useStore';

import { DEFAULT_AXIS_WIDTH, MIN_HEADER_WIDTH } from './constants';

export function getMaxWidth(store: Store<AxisProps>): number {
  const values = Object.values(store);
  const max = (Math.max(...values.map((array) => array.length)) - 1) * DEFAULT_AXIS_WIDTH;
  return Math.max(max, MIN_HEADER_WIDTH);
}
