import { createContext } from 'react';

import { type Scale, type Range, Domain } from 'types';

export interface CurveTrackContext {
  key: string;
  width: number;
  height: number;
  scale: Scale;
  lines?: number;
  range?: Range<number>;
  domain?: Domain;
}

const CurveTrackContext = createContext<CurveTrackContext>({} as CurveTrackContext);

export default CurveTrackContext;
