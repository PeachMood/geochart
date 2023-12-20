import { useContext } from 'react';

import CurveTrackContext from 'context/CurveTrackContext';

export default function useCurveTrack() {
  return useContext(CurveTrackContext);
}
