import { Coordinates, Position } from 'types';

export const DEFAULT_MIN_VALUE: number = 0;

export const DEFAULT_AXIS_WIDTH: number = 60;

export const DEFAULT_LINES_COUNT: number = 0;

export const TICKS_LINES_FACTOR: number = 2;

export const DEFAULT_COORDINATES: Coordinates = { x: 1, y: 0 };

export const COLOR_FACTORS = { RED: 299, GREEN: 587, BLUE: 114, BRIGHTNESS: 1000, DARK: 125 };

export const DEFAULT_COLORS = { DARK: '#5F302D', LIGHT: '#FFFFFF' };

export const ID_PREFIX: string = 'axis-gradient';

export const AXIS_POSITIONS: { [key: string]: Position } = {
  bottom: 'left',
  top: 'right',
  left: 'right',
  right: 'left',
};
