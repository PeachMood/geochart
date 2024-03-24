import { useRef, useEffect, useState } from 'react';

import { type Size } from 'types';

const DEFAULT_SIZE = 0;

export default function useParentSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: DEFAULT_SIZE, height: DEFAULT_SIZE });

  useEffect(() => {
    function updateSize() {
      const current = ref.current;
      if (current) {
        setSize({ width: current.offsetWidth, height: current.offsetHeight });
      }
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return { size, ref };
}
