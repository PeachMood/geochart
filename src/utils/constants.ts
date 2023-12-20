import { type Curve, type CurveTrack, type DepthTrack, type LogView } from 'utils/types';

export const defaultLogView: LogView = {
  name: 'Планшет',
  orientation: 'horizontal',
  scope: 4000,
  width: 1200,
  height: 800,
  units: 'м',
  depth: [],
  domain: {},
  grid: {
    main: {
      style: { color: '#E6E9EC', thickness: 2, type: 'solid' },
      interval: 100,
    },
    secondary: {
      style: { color: '#E6E9EC', thickness: 1, type: 'solid' },
      lines: 4,
    }
  }
};

export const defaultCurveTrack: CurveTrack = {
  name: 'Трек',
  width: 140,
  scale: 'linear',
  grid: {
    main: {
      lines: 1,
      isDisplayed: true,
    },
    secondary: {
      lines: 2,
      leftOffset: 0,
      rightOffset: 0,
      isDisplayed: false,
    }
  }
};

export const defaultDepthTrack: DepthTrack = {
  name: 'Трек глубины',
  width: 60,
  main: {
    name: 'MD',
    color: '#021D38',
    floatingPoint: 0,
  }
};

export const defaultCurve: Curve = {
  name: 'Кривая',
  style: { color: '#021D38', thickness: 1, type: 'solid' },
  isContinuous: true,
  domain: {},
  data: [],
};

const defaultAxis = {
  height: 60,
  strokeWidth: 2,
};

export const defaultLeftAxis = {
  ...defaultAxis,
  labelOffset: 0,
  left: 30,
  top: 1,
  orientation: 'left' as any,
  tickTransform: 'translate(8, 0)',
  tickLabelProps: { x: 15, angle: -90 },
};

export const defaultTopAxis = {
  ...defaultAxis,
  labelOffset: -10,
  top: 30,
  left: 1,
  orientation: 'top' as any,
  tickTransform: 'translate(0, 8)',
  tickLabelProps: { y: 15 },
};

export const defaultDepthAxis = {
  height: 80,
  gap: 20,
  y: 4,
  x: '50%',
};
