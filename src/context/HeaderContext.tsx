import { createContext } from 'react';

import { type DepthHeaderProps as Depth, type AxisProps as Axis } from 'types';

export interface HeaderContext {
  setDepth: (depth: Depth) => void;
  deleteDepth: () => void;
  setCurveAxis: (key: string, axis: Axis) => void;
  getCurveAxis: (key: string, index: number) => Axis | undefined;
  deleteCurveAxis: (key: string, axis: Axis) => void;
}

const HeaderContext = createContext<HeaderContext>({} as HeaderContext);

export default HeaderContext;
