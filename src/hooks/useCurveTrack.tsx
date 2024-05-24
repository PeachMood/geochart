import { useContext, useEffect, useMemo } from 'react';

import { type CurveTrackContext as CurveTrack } from 'context/CurveTrackContext';
import HeaderContext from 'context/HeaderContext';
import { AxisType } from 'components/ui/Axis';

export default function useCurveTrack(curveTrack: CurveTrack): CurveTrack {
  const { key, scale, lines, width, height, position, domain } = curveTrack;
  const header = useContext(HeaderContext);

  const value = useMemo(() => ({ key, scale, lines, width, height, position, domain }), [key, scale, width, height, lines, position, domain]);

  useEffect(() => {
    const axis = { key, name: 'Placeholder', type: AxisType.Placeholder };
    header.setAxis(key, axis);
    return () => header.deleteAxis(key, axis);
  }, []);

  return value;
}
