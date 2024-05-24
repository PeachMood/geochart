import { type FC } from 'react';
import { Axis } from '@visx/axis';

import { type Color, type Position, type Size, type Ticks } from 'types';
import useScale from 'hooks/useScale';
import useTicks from 'hooks/useTicks';

import { DEFAULT_COLOR, DEFAULT_IS_LABELED, DEFAULT_TICKS_INTERVAL, DEFAULT_TICKS_LINES } from './constants';
import { RANGE_START, TOP_PADDING, MAIN_TICK_LENGTH, SECONDARY_TICK_LENGTH, LEFT_PADDING } from './constants';
import { getTickFormat, tickLabelProps } from './utils';

export interface DepthAxisProps {
  size: Size;
  position: Position;
  ticks: Ticks;
  isLabeled?: boolean;
  color?: Color;
}

export const DepthAxis: FC<DepthAxisProps> = (props) => {
  const { ticks, size, position, isLabeled = DEFAULT_IS_LABELED, color = DEFAULT_COLOR } = props;
  const { domain, interval = DEFAULT_TICKS_INTERVAL, lines = DEFAULT_TICKS_LINES } = ticks;

  const range = [RANGE_START, size.width];
  const scale = useScale(range, domain);

  const mTicks = useTicks({ domain, interval });
  const sTicks = useTicks({ domain, interval, lines });

  const top = position === 'top' ? size.height - 1 : TOP_PADDING;

  return (
    <svg width={size.width} height={size.height}>
      <Axis
        top={top}
        left={LEFT_PADDING}
        scale={scale}
        orientation={position}
        tickValues={mTicks}
        stroke={color}
        tickStroke={color}
        tickLength={MAIN_TICK_LENGTH}
        tickLabelProps={tickLabelProps(size, color)}
        tickFormat={getTickFormat(isLabeled)}
      />
      <Axis
        top={top}
        left={LEFT_PADDING}
        scale={scale}
        orientation={position}
        tickValues={sTicks}
        stroke={color}
        tickStroke={color}
        tickLength={SECONDARY_TICK_LENGTH}
        tickFormat={getTickFormat(false)}
      />
    </svg>
  );
};
