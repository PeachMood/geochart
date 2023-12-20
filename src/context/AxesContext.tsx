import { createContext } from 'react';

import { type Axis, type DepthAxis } from 'utils/types';

export interface AxesContext {
  setDepthAxis: (depthAxis: DepthAxis) => void;
  deleteDepthAxis: () => void;
  addAxis: (axis: Axis) => void;
  deleteAxis: (key: string) => void;
}

const AxesContext = createContext<AxesContext>({} as AxesContext);

export default AxesContext;
