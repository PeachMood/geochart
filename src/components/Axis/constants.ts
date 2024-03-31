import { format } from '@visx/vendor/d3-format';

import { type AxisDefaults } from './Axis';

export const HEIGHT_PADDING: number = 2;

export const RANGE_END: number = 0;

export const DEFAULT_AXIS_WIDTH = 60;

export const DEFAULT_AXIS = {
  width: 60,
  strokeWidth: 2,
  tickFormat: format('.4'),
};

export const DEFAULT_LEFT_AXIS: AxisDefaults = {
  ...DEFAULT_AXIS,
  labelOffset: 0,
  left: 30,
  top: 1,
  orientation: 'left',
  tickTransform: 'translate(8, 0)',
  tickLabelProps: { x: 15, angle: -90 },
};

export const DEFAULT_TOP_AXIS: AxisDefaults = {
  ...DEFAULT_AXIS,
  labelOffset: -10,
  top: 30,
  left: 1,
  orientation: 'top',
  tickTransform: 'translate(0, 8)',
  tickLabelProps: { y: 15 },
};
