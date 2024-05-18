import { useContext, useEffect } from 'react';

import HeaderContext from 'context/HeaderContext';
import { NumericAxisProps as Axis, AxisType } from 'components/ui/Axis';

export default function useCurveAxis(key: string, axis: Axis) {
  const header = useContext(HeaderContext);
  const { key: index, type = AxisType.Numeric, name, height, scale, position, color, ticks } = axis;
  const { domain, lines } = ticks;
  const { min, max } = domain;

  useEffect(() => {
    const domain = { min, max };
    const ticks = { domain, lines };
    const axis = { key: index, name, type, height, position, scale, color, ticks };
    header.setAxis(key, axis);
    return () => header.deleteAxis(key, axis);
  }, [key, index, type, name, height, scale, position, color, min, max, lines]);
}
