import { useMemo } from 'react';
import { scaleLinear } from '@visx/scale';
import { GridRows, GridColumns } from '@visx/grid';

import CurveTrackContext from 'context/CurveTrackContext';
import useLogView from 'hooks/useLogView';
import useKey from 'hooks/useKey';
import { defaultCurveTrack } from 'utils/constants';
import { getAdjustedSize, range, scaleBuilder } from 'utils/utils';
import { type Component, type CurveTrack as CurveTrackProps } from 'utils/types';

import styles from './CurveTrack.module.css';

const CurveTrack: Component<CurveTrackProps> = ({ children, ...props }) => {
  const curveTrack = useMemo(() => ({ ...defaultCurveTrack, ...props }), [props]);
  const logView = useLogView();
  const key = useKey();

  const size = getAdjustedSize(curveTrack.width, logView.width, logView.orientation);

  const xScale = scaleLinear<number>({
    domain: [logView.domain.min!, logView.domain.max!],
    range: [0, size.width],
  });

  const yScale = scaleBuilder(curveTrack.scale)<number>({ range: [size.height, 0] });

  const xMainTickValues = range(logView.domain.min!, logView.domain.max!, logView.grid.main?.interval);

  const xSecondaryStep = logView.grid.main?.interval / (logView.grid.secondary?.lines + 1);
  const xSecondryTickValues = range(logView.domain.min!, logView.domain.max!, xSecondaryStep);

  const ticks = yScale.ticks();
  const domain = [ticks[0], ticks[ticks.length - 1]];
  const yMainCount = (domain[1] * 1.0) / (curveTrack.grid.main?.lines + 1);
  const yMainTickValues = range(domain[0], domain[1], yMainCount);

  const ySecondryCount = curveTrack.grid.secondary?.lines;
  const ySecondryTickValues = yScale.ticks(ySecondryCount);

  const curveTrackContext = useMemo(
    () => ({
      key,
      scale: curveTrack.scale,
      width: size.height,
      height: size.width,
    }),
    [key, curveTrack.scale, size.width, size.height],
  );

  return (
    <CurveTrackContext.Provider value={curveTrackContext}>
      <section className={styles.track}>
        <svg width={size.width} height={size.height}>
          <GridColumns
            scale={xScale}
            width={size.width}
            height={size.height}
            strokeWidth={logView.grid.secondary?.style?.thickness}
            stroke={logView.grid.secondary?.style?.color}
            tickValues={xSecondryTickValues}
          />
          {curveTrack.grid.secondary?.isDisplayed && (
            <GridRows
              scale={yScale}
              width={size.width}
              height={size.height}
              strokeWidth={logView.grid.secondary?.style?.thickness}
              stroke={logView.grid.secondary?.style?.color}
              tickValues={ySecondryTickValues}
            />
          )}
          {curveTrack.grid.main?.isDisplayed && (
            <GridRows
              scale={yScale}
              width={size.width}
              height={size.height}
              strokeWidth={logView.grid.main?.style?.thickness}
              stroke={logView.grid.main?.style?.color}
              tickValues={yMainTickValues}
            />
          )}
          <GridColumns
            scale={xScale}
            width={size.width}
            height={size.height}
            strokeWidth={logView.grid.main?.style?.thickness}
            stroke={logView.grid.main?.style?.color}
            tickValues={xMainTickValues}
          />
          {children}
        </svg>
      </section>
    </CurveTrackContext.Provider>
  );
};

export default CurveTrack;
