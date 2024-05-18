import { useContext, useEffect, useState } from 'react';

import { type NumericAxisProps, isNumericAxis } from 'components/ui/Axis';
import HeaderContext from 'context/HeaderContext';

export default function useFirstCurve(key: string) {
  const header = useContext(HeaderContext);
  const [axis, setAxis] = useState<NumericAxisProps>();

  useEffect(() => {
    const axes = header.getAxes(key, isNumericAxis);
    setAxis(axes[0] as NumericAxisProps);
  }, [key, header]);

  return axis;
}
