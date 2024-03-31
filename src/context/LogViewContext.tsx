import { createContext } from 'react';

import { type Ticks, type Domain, type Orientation, type VerticalGrid, type Units } from 'types';

export interface LogViewContext {
  width: number;
  height: number;
  orientation: Orientation;
  domain: Domain;
  scope: number;
  units: Units;
  grid: VerticalGrid;
  depth: Ticks;
}

const LogViewContext = createContext<LogViewContext>({} as LogViewContext);

export default LogViewContext;
