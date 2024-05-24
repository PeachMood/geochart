import { useContext, useEffect } from 'react';

import HeaderContext from 'context/HeaderContext';
import { GradientAxisProps as Axis, AxisType } from 'components/ui/Axis';

export default function useGradientAxis(key: string, axis: Axis) {
  const header = useContext(HeaderContext);
  const { key: index, type = AxisType.Gradient, name, height, position, gradient, ticks, domain, scale } = axis;
  const { min, max } = domain;

  useEffect(() => {
    const domain = { min, max };
    const axis = { key: index, name, type, height, ticks, gradient, position, domain };
    header.setAxis(key, axis);
    return () => header.deleteAxis(key, axis);
  }, [key, index, name, type, height, position, gradient, scale, min, max, ticks?.domain.min, ticks?.domain.max, ticks?.interval, ticks?.lines]);
}
