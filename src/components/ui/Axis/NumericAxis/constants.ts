import { format } from '@visx/vendor/d3-format';

import { type Color, type Position } from 'types';

import { type NumericAxisDefaults as AxisDefaults } from './NumericAxis';

export const HEIGHT_PADDING: number = 2;

export const RANGE_END: number = 0;

export const DEFAULT_COLOR: Color = 'black';

export const DEFAULT_NAME: string = 'Axis';

export const DEFAULT_HIDDEN_NAME: string = '';

export const DEFAULT_POSITION: Position = 'top';

const DEFAULT_AXIS = {
  width: 60,
  strokeWidth: 2,
  hideAxisLine: false,
  hideTicks: false,
  tickFormat: format('.4'),
};

const DEFAULT_BOTTOM_AXIS: AxisDefaults = {
  ...DEFAULT_AXIS,
  labelOffset: 0,
  left: 30,
  top: 1,
  orientation: 'left',
  tickTransform: 'translate(8, 0)',
  tickLabelProps: { x: 15, angle: -90 },
};

const DEFAULT_TOP_AXIS: AxisDefaults = DEFAULT_BOTTOM_AXIS;

const DEFAULT_LEFT_AXIS: AxisDefaults = {
  ...DEFAULT_AXIS,
  labelOffset: 0,
  left: 30,
  top: 1,
  orientation: 'left',
  tickTransform: 'translate(8, 0)',
  tickLabelProps: { x: -17, angle: -90 },
};

const DEFAULT_RIGHT_AXIS: AxisDefaults = DEFAULT_LEFT_AXIS;

export const DEFAULT_AXIS_MAP = {
  top: DEFAULT_TOP_AXIS,
  bottom: DEFAULT_BOTTOM_AXIS,
  left: DEFAULT_LEFT_AXIS,
  right: DEFAULT_RIGHT_AXIS,
};
