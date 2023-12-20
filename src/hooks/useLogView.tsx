import { useContext } from 'react';

import LogViewContext from 'context/LogViewContext';

export default function useLogView() {
  return useContext(LogViewContext);
}
