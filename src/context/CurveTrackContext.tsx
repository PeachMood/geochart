import { createContext } from 'react';

import { type Scale } from 'types';

export interface CurveTrackContext {
  key: string;
  width: number;
  height: number;
  scale: Scale;
  lines?: number;
}

const CurveTrackContext = createContext<CurveTrackContext>({} as CurveTrackContext);

export default CurveTrackContext;
