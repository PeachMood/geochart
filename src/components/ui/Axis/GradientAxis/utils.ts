import { color as formatColor } from '@visx/vendor/d3-color';

import { type Position, type Color, type Gradient } from 'types';

import { DEFAULT_COLORS, DEFAULT_MIN_VALUE, COLOR_FACTORS, ID_PREFIX, AXIS_POSITIONS } from './constants';

function getBrightness(color: Color): number {
  const { r = DEFAULT_MIN_VALUE, g = DEFAULT_MIN_VALUE, b = DEFAULT_MIN_VALUE } = formatColor(color)?.rgb() || {};
  const brightness = COLOR_FACTORS.RED * r + COLOR_FACTORS.GREEN * g + COLOR_FACTORS.BLUE * b;
  return brightness / COLOR_FACTORS.BRIGHTNESS;
}

export function isDark(color: Color): boolean {
  return getBrightness(color) <= COLOR_FACTORS.DARK;
}

export function isFlipped(position: Position = 'top'): boolean {
  return position === 'bottom' || position === 'left';
}

export function getContrastColor(gradient: Gradient = []): Color {
  const color = gradient[Math.round(gradient.length / 2)].value;
  return isDark(color) ? DEFAULT_COLORS.LIGHT : DEFAULT_COLORS.DARK;
}

export function getGradientId(name: string = ''): string {
  return `${ID_PREFIX}-${name}`;
}

export function getAxisPosition(position: Position = 'bottom'): Position {
  return AXIS_POSITIONS[position];
}
