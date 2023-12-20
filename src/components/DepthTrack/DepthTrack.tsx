import { useEffect, useMemo } from 'react';
import { AxisBottom, AxisTop } from '@visx/axis';
import { scaleLinear } from '@visx/scale';

import useLogView from 'hooks/useLogView';
import useAxes from 'hooks/useAxes';
import { type Component, type DepthTrack as DepthTrackProps } from 'utils/types';
import { defaultDepthTrack } from 'utils/constants';
import { getAdjustedSize, range } from 'utils/utils';

import styles from './DepthTrack.module.css';

const DepthTrack: Component<DepthTrackProps> = (props) => {
  const logView = useLogView();
  const axes = useAxes();
  const depthTrack = useMemo(() => ({ ...defaultDepthTrack, ...props }), [props]);

  const size = getAdjustedSize(depthTrack.width, logView.width, logView.orientation);

  const xScale = scaleLinear<number>({
    domain: [logView.domain?.min || 0, logView.domain?.max || 0],
    range: [0, size.width - 1],
  });

  const tickFormat = (value: any) => {
    return value.toLocaleString('en-US', { useGrouping: false });
  };

  const xMainCount = (logView.domain?.max! - logView.domain?.min!) / logView.grid?.main?.interval;
  const xMainTickValues = range(logView.domain?.min!, logView.domain?.max!, logView.grid?.main?.interval);

  const xSecondaryStep = logView.grid?.main?.interval / (logView.grid?.secondary?.lines + 1);
  const xSecondryTickValues = range(logView.domain?.min!, logView.domain?.max!, xSecondaryStep);

  useEffect(() => {
    const depthAxis = {
      width: depthTrack.width,
      scope: logView.scope,
      units: logView.units,
      orientation: logView.orientation,
      main: depthTrack.main,
      secondary: depthTrack.secondary,
    };
    axes.setDepthAxis(depthAxis);
    return () => {
      axes.deleteDepthAxis();
    };
  }, [logView.scope, logView.units, logView.orientation, depthTrack.main, depthTrack.secondary, size.width]);

  return (
    <section className={styles.track}>
      <svg width={size.width} height={size.height}>
        <AxisTop
          left={1}
          top={60}
          stroke={depthTrack.main.color}
          scale={xScale}
          tickComponent={() => null}
          hideAxisLine
          tickLength={8}
          tickValues={xMainTickValues}
        />
        <AxisTop
          left={1}
          top={60}
          scale={xScale}
          stroke={depthTrack.main.color}
          tickComponent={() => null}
          hideAxisLine
          tickLength={4}
          tickValues={xSecondryTickValues}
        />
        <AxisBottom
          left={1}
          scale={xScale}
          tickComponent={() => null}
          hideAxisLine
          stroke={depthTrack.main.color}
          tickLength={4}
          tickValues={xSecondryTickValues}
        />
        <AxisBottom
          left={1}
          tickValues={xMainTickValues}
          hideAxisLine
          tickLength={8}
          scale={xScale}
          stroke={depthTrack.main.color}
          tickFormat={tickFormat}
          tickLabelProps={(_: any, index: number) => ({
            y: 33,
            fontSize: 12,
            fontWeight: 400,
            fill: depthTrack.main.color,
            fontFamily: 'sans-serif',
            textAnchor: index === 0 ? 'start' : index === xMainTickValues.length - 1 ? 'end' : 'middle',
          })}
        />
      </svg>
    </section>
  );
};

export default DepthTrack;
