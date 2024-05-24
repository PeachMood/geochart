import { GridRows } from '@visx/grid';

import { type Component, type HorizontalGrid as GridProps, type LineStyle, type Scale, type Size } from 'types';
import useFirstCurve from 'hooks/useFirstCurve';
import useScale from 'hooks/useScale';
import useTicks from 'hooks/useTicks';

import { DEFAULT_MAIN_GRID_LINES, DEFAULT_SECONDARY_GRID_LINES, DEFAUL_MAIN_GRID_INTERVAL } from './constants';
import { DEFAULT_GRID_DOMAIN, RANGE_END } from './constants';

export type HorizontalGridProps = GridProps & {
  track: string;
  main?: { style?: LineStyle };
  secondary?: { style?: LineStyle };
  scale: Scale;
  size: Size;
};

export const HorizontalGrid: Component<HorizontalGridProps> = (props) => {
  const { track: key, main, secondary, children, size } = props;
  const curve = useFirstCurve(key);

  const domain = curve?.ticks?.domain || DEFAULT_GRID_DOMAIN;
  const range = [size.height, RANGE_END];
  const scale = useScale(range, domain, undefined, props.scale);

  const mLines = main?.lines || DEFAULT_MAIN_GRID_LINES;
  const mTicks = useTicks({ domain, lines: mLines }, props.scale, 'main');
  const mInterval = mTicks[1] - mTicks[0] || DEFAUL_MAIN_GRID_INTERVAL;

  const sLines = secondary?.lines || DEFAULT_SECONDARY_GRID_LINES;
  const sTicks = useTicks({ domain, interval: mInterval, lines: sLines }, props.scale, 'secondary');

  return (
    <svg width={size.width} height={size.height}>
      {secondary?.isDisplayed && (
        <GridRows
          scale={scale}
          width={size.width}
          height={size.height}
          strokeWidth={secondary?.style?.thickness}
          stroke={secondary?.style?.color}
          tickValues={sTicks}
        />
      )}
      {main?.isDisplayed && (
        <GridRows
          scale={scale}
          width={size.width}
          height={size.height}
          strokeWidth={main?.style?.thickness}
          stroke={main?.style?.color}
          tickValues={mTicks}
        />
      )}
      {children}
    </svg>
  );
};
