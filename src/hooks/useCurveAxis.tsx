import { useContext, useEffect } from 'react';

import HeaderContext from 'context/HeaderContext';
import { AxisProps as Axis } from 'components/Axis';

export default function useCurveAxis(key: string, axis: Axis) {
  const header = useContext(HeaderContext);
  const { key: index, name, height, scale, color, ticks } = axis;
  const { domain, lines } = ticks;
  const { min, max } = domain;

  useEffect(() => {
    const domain = { min, max };
    const ticks = { domain, lines };
    const axis = { key: index, name, height, scale, color, ticks };
    header.setCurveAxis(key, axis);
    return () => {
      header.deleteCurveAxis(key, axis);
    };
  }, [key, index, name, height, scale, color, min, max, lines]);
}
