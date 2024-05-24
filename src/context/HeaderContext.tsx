import { createContext } from 'react';

import { AxisProps as Axis } from 'components/ui/Axis';
import { DepthHeaderProps as Depth } from 'components/ui/DepthHeader';
import { Predicate } from 'types';

export interface HeaderContext {
  setAxis: (key: string, axis: Axis) => void;
  getAxis: (key: string, index: number) => Axis | undefined;
  getAxes: (key: string, predicate: Predicate<Axis>) => Axis[];
  deleteAxis: (key: string, axis: Axis) => void;
  setDepth: (depth: Depth) => void;
  deleteDepth: () => void;
}

const HeaderContext = createContext<HeaderContext>({} as HeaderContext);

export default HeaderContext;
