import { useContext, useEffect, useState } from 'react';
import { GridRows } from '@visx/grid';

import { type AxisProps as Axis, type Component, type HorizontalGrid as GridProps, type LineStyle, type Scale, type Size } from 'types';
import HeaderContext from 'context/HeaderContext';
import useScale from 'hooks/utils/useScale';
import useTicks from 'hooks/utils/useTicks';

import { DEFAULT_MAIN_GRID_LINES, DEFAULT_SECONDARY_GRID_LINES, DEFAUL_MAIN_GRID_INTERVAL, GRID_DOMAIN, RANGE_END } from './constants';

export type HorizontalGridProps = GridProps & {
  track: string;
  main?: { style?: LineStyle };
  secondary?: { style?: LineStyle };
  scale: Scale;
  size: Size;
};

const HorizontalGrid: Component<HorizontalGridProps> = ({ track: key, main, secondary, children, size, ...props }) => {
  const axes = useContext(HeaderContext);
  const [curve, setCurve] = useState<Axis>();

  const domain = curve?.ticks.domain || GRID_DOMAIN;
  const range = { start: size.height, end: RANGE_END };
  const scale = useScale(range, domain, props.scale);

  const mLines = main?.lines || DEFAULT_MAIN_GRID_LINES;
  const mTicks = useTicks({ domain, lines: mLines }, props.scale, 'main');
  const mInterval = mTicks[1] - mTicks[0] || DEFAUL_MAIN_GRID_INTERVAL;

  const sLines = secondary?.lines || DEFAULT_SECONDARY_GRID_LINES;
  const sTicks = useTicks({ domain, interval: mInterval, lines: sLines }, props.scale, 'secondary');

  useEffect(() => {
    setCurve(axes.getCurveAxis(key, 0));
  }, [key, axes]);

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

export default HorizontalGrid;
