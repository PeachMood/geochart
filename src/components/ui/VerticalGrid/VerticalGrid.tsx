import { GridColumns } from '@visx/grid';

import { type VerticalGrid as GridProps, type Domain, type Component, type Size } from 'types';
import useScale from 'hooks/useScale';
import useTicks from 'hooks/useTicks';

import { DEFAULT_MAIN_GRID_INTERVAL, DEFAULT_SECONDARY_GRID_LINES, LEFT_OFFSET, RANGE_START } from './constants';

export type VerticalGridProps = GridProps & {
  domain: Required<Domain>;
  size: Size;
};

export const VerticalGrid: Component<VerticalGridProps> = ({ main, secondary, domain, size, children }) => {
  const range = [RANGE_START, size.width];
  const scale = useScale(range, domain);

  const mInterval = main?.interval || DEFAULT_MAIN_GRID_INTERVAL;
  const mTicks = useTicks({ domain, interval: mInterval });

  const sLines = secondary?.lines || DEFAULT_SECONDARY_GRID_LINES;
  const sTicks = useTicks({ domain, interval: mInterval, lines: sLines });

  return (
    <svg width={size.width} height={size.height}>
      <GridColumns
        offset={LEFT_OFFSET}
        scale={scale}
        width={size.width}
        height={size.height}
        strokeWidth={secondary?.style?.thickness}
        stroke={secondary?.style?.color}
        tickValues={sTicks}
      />
      <GridColumns
        offset={LEFT_OFFSET}
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
