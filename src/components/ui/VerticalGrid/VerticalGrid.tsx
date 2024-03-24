import { GridColumns } from '@visx/grid';

import { type VerticalGrid as GridProps, type Domain, type Component, type Size } from 'types';
import useScale from 'hooks/utils/useScale';
import useTicks from 'hooks/utils/useTicks';

import { DEFAULT_MAIN_GRID_INTERVAL, DEFAULT_SECONDARY_GRID_LINES } from './constants';

export type VerticalGridProps = GridProps & {
  domain: Required<Domain>;
  size: Size;
};

const VerticalGrid: Component<VerticalGridProps> = ({ main, secondary, domain, size, children }) => {
  const range = { start: 0, end: size.width };
  const scale = useScale(range, domain);

  const mInterval = main?.interval || DEFAULT_MAIN_GRID_INTERVAL;
  const mTicks = useTicks({ domain, interval: mInterval });

  const sLines = secondary?.lines || DEFAULT_SECONDARY_GRID_LINES;
  const sTicks = useTicks({ domain, interval: mInterval, lines: sLines });

  return (
    <svg width={size.width} height={size.height}>
      <GridColumns
        scale={scale}
        width={size.width}
        height={size.height}
        strokeWidth={secondary?.style?.thickness}
        stroke={secondary?.style?.color}
        tickValues={sTicks}
      />
      <GridColumns
        scale={scale}
        width={size.width}
        height={size.height}
        strokeWidth={main?.style?.thickness}
        stroke={main?.style?.color}
        tickValues={mTicks}
      />

      {children}
    </svg>
  );
};

export default VerticalGrid;
