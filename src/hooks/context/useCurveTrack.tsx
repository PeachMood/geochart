import { useMemo } from 'react';

import { type CurveTrackContext as CurveTrack } from 'context/CurveTrackContext';

export default function useCurveTrack(curveTrack: CurveTrack): CurveTrack {
  const { key, scale, lines, width, height } = curveTrack;
  const value = useMemo(() => ({ key, scale, lines, width, height }), [key, scale, width, height, lines]);
  return value;
}
