import { IGrid } from '../types/ILogView';

export const defaultGrid: IGrid = {
  main: {
    style: {
      color: '#808080',
      thickness: 2,
      type: 'solid',
    },
    interval: 50,
  },
  secondary: {
    style: {
      color: '#f0f0f0',
      thickness: 1,
      type: 'solid',
    },
    lines: 1,
  },
};
