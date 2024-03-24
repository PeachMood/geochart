import { type FC } from 'react';
import { Axis } from '@visx/axis';

import { type Color, type Position, type Size, type Ticks } from 'types';
import useScale from 'hooks/utils/useScale';
import useTicks from 'hooks/utils/useTicks';

import {
  STROKE_COLOR,
  DEFAULT_TICKS_INTERVAL,
  DEFAULT_TICKS_LINES,
  RANGE_START,
  TOP_PADDING,
  MAIN_TICK_LENGTH,
  SECONDARY_TICK_LENGTH,
  TICK_LABEL_PROPS,
} from './constants';
import { getTickFormat } from './utils';

export interface DepthAxisProps {
  size: Size;
  position: Position;
  ticks: Ticks;
  isLabeled?: boolean;
  color?: Color;
}

export const DepthAxis: FC<DepthAxisProps> = ({ ticks, color, size, position, isLabeled = false }) => {
  const { domain, interval = DEFAULT_TICKS_INTERVAL, lines = DEFAULT_TICKS_LINES } = ticks;

  const range = { start: RANGE_START, end: size.width };
  const scale = useScale(range, domain);

  const mTicks = useTicks({ domain, interval });
  const sTicks = useTicks({ domain, interval, lines });

  const top = position === 'top' ? size.height - 1 : TOP_PADDING;

  return (
    <svg width={size.width} height={size.height}>
      <Axis
        top={top}
        scale={scale}
        orientation={position}
        tickValues={mTicks}
        stroke={STROKE_COLOR}
        tickLength={MAIN_TICK_LENGTH}
        tickFormat={getTickFormat(isLabeled)}
        tickLabelProps={(_, index) => ({
          fill: color,
          textAnchor: index === 0 ? 'start' : 'middle',
          ...TICK_LABEL_PROPS,
        })}
      />
      <Axis
        top={top}
        scale={scale}
        orientation={position}
        tickValues={sTicks}
        stroke={STROKE_COLOR}
        tickLength={SECONDARY_TICK_LENGTH}
        tickFormat={getTickFormat(false)}
      />
    </svg>
  );
};

export default DepthAxis;
