import { useContext } from 'react';

import AxesContext from 'context/AxesContext';

export default function useAxes() {
  return useContext(AxesContext);
}
