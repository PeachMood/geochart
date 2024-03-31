import { useContext, useEffect } from 'react';

import HeaderContext from 'context/HeaderContext';
import { DepthHeaderProps as Depth } from 'components/DepthHeader';

export default function useDepthTrack(depth: Depth) {
  const header = useContext(HeaderContext);
  const { height, scope, units, main, secondary } = depth;

  useEffect(() => {
    const depth = { height, scope, units, main, secondary };
    header.setDepth(depth);
  }, [height, scope, units, main, secondary]);
}
