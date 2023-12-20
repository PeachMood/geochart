import { createContext } from 'react';

import { type Scale } from 'utils/types';

export interface CurveTrackContext {
  key: string;
  scale: Scale;
  width: number;
  height: number;
}

const CurveTrackContext = createContext<CurveTrackContext>({} as CurveTrackContext);

export default CurveTrackContext;
