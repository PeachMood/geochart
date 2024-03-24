import { useMemo } from 'react';

import { type LogViewContext as LogView } from 'context/LogViewContext';

export default function useLogView(logView: LogView): LogView {
  const { width, height, orientation, domain, scope, units, grid, depth } = logView;
  const value = useMemo(
    () => ({ width, height, orientation, domain, scope, units, grid, depth }),
    [width, height, orientation, domain, scope, units, grid, depth],
  );
  return value;
}
