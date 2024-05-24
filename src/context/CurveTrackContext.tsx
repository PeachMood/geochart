import { createContext } from 'react';

import { type Scale, type Position, Domain } from 'types';

export interface CurveTrackContext {
  key: string;
  width: number;
  height: number;
  scale?: Scale;
  lines?: number;
  position?: Position;
  domain?: Required<Domain>;
}

const CurveTrackContext = createContext<CurveTrackContext>({} as CurveTrackContext);

export default CurveTrackContext;
