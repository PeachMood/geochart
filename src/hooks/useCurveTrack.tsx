import { useMemo } from 'react';

import { type CurveTrackContext as CurveTrack } from 'context/CurveTrackContext';

export default function useCurveTrack(curveTrack: CurveTrack): CurveTrack {
  const { key, scale, lines, width, height, range, domain } = curveTrack;

  const value = useMemo(() => ({ key, scale, lines, width, height, range, domain }), [key, scale, width, height, lines, range]);
  return value;
}
