import { useMemo } from 'react';

import { type HeaderContext as Header } from 'context/HeaderContext';

export default function useHeader(header: Header): Header {
  const { setDepth, deleteDepth, setAxis, getAxis, getAxes, deleteAxis } = header;
  const value = useMemo(
    () => ({ setDepth, deleteDepth, setAxis, getAxis, getAxes, deleteAxis }),
    [setDepth, deleteDepth, setAxis, getAxis, getAxes, deleteAxis],
  );
  return value;
}
