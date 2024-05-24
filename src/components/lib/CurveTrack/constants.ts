import { type HorizontalGrid, type Scale } from 'types';

export const DEFAULT_NAME: string = 'Трек';

export const DEFAULT_HEIGHT: number = 160;

export const DEFAULT_SCALE: Scale = 'linear';

export const DEFAULT_HORIZONTAL_GRID: HorizontalGrid = {
  main: {
    lines: 1,
    isDisplayed: true,
  },
  secondary: {
    lines: 2,
    leftOffset: 0,
    rightOffset: 0,
    isDisplayed: true,
  },
};
