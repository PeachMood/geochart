import { type Orientation, type Units, type VerticalGrid } from 'types';

export const DEFAULT_NAME: string = 'Планшет';

export const DEFAULT_SCOPE: number = 100;

export const DEFAULT_ORIENTATION: Orientation = 'horizontal';

export const DEFAULT_UNITS: Units = 'm';

export const DEFAULT_VERTICAL_GRID: VerticalGrid = {
  main: {
    style: { color: '#E6E9EC', thickness: 2, type: 'solid' },
    interval: 100,
  },
  secondary: {
    style: { color: '#E6E9EC', thickness: 1, type: 'solid' },
    lines: 4,
  },
};
