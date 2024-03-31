import { useMemo } from 'react';

import { type HeaderContext as Header } from 'context/HeaderContext';

export default function useHeader(header: Header): Header {
  const { setDepth, deleteDepth, setCurveAxis, getCurveAxis, deleteCurveAxis } = header;
  const value = useMemo(
    () => ({ setDepth, deleteDepth, setCurveAxis, getCurveAxis, deleteCurveAxis }),
    [setDepth, deleteDepth, setCurveAxis, getCurveAxis, deleteCurveAxis],
  );
  return value;
}
