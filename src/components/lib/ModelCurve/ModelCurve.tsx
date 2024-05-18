import { useCallback, useContext } from 'react';
import { AreaClosed, LinePath } from '@visx/shape';
import { GridColumns } from '@visx/grid';
import { curveLinear } from '@visx/curve';

import { Component, Palette, Borders, MultiModel, Model, CurveValue, Gradient } from 'types';
import LogViewContext from 'context/LogViewContext';
import CurveTrackContext from 'context/CurveTrackContext';
import LinearGradient from 'components/ui/LinearGradient';
import useGradientAxis from 'hooks/useGradientAxis';
import useCurveTrack from 'hooks/useCurveTrack';
import useMultiModel from 'hooks/useMultiModel';
import useFirstCurve from 'hooks/useFirstCurve';
import useSort from 'hooks/useSort';
import useScale from 'hooks/useScale';
import useScope from 'hooks/useScope';
import useDomain from 'hooks/useDomain';
import useTicks from 'hooks/useTicks';
import useKey from 'hooks/useKey';
import useMap from 'hooks/useMap';
import useGradient from 'hooks/useGradient';

import { DEFAULT_BORDERS, DEFAULT_HEIGHT, DEFAULT_NAME, RANGE_START } from './constants';
import { compareByPosition, getGradientColor, getPosition } from './utils';
import styles from './ModelCurve.module.css';

export interface ModelCurveProps {
  name: string;
  height: number;
  palette: Palette;
  borders: Borders;
  data: MultiModel;
}

export const ModelCurve: Component<Partial<ModelCurveProps>> = (props) => {
  const { name = DEFAULT_NAME, height = DEFAULT_HEIGHT, borders = DEFAULT_BORDERS, children } = props;

  const key = useKey();
  const logView = useContext(LogViewContext);
  const curve = useFirstCurve(key);

  const width = useScope(logView.domain, logView.scope);
  const depth = useTicks(logView.depth);

  const scope = width / height;
  const multiModel = useSort<Model>(props?.data, compareByPosition);
  const wellArea = useMultiModel(multiModel, logView.depth, scope);

  const xRange = [RANGE_START, width];
  const xScale = useScale(xRange, logView.domain);
  const xTicks = useMap(multiModel, getPosition);

  const yRange = [RANGE_START, height];
  const yDomain = useDomain(curve?.ticks?.domain, wellArea.border);
  const yScale = useScale(yRange, yDomain);

  const { gradient, domain, scale } = useGradient(props.palette, wellArea.palette);
  const up: Gradient = useMap(wellArea.up, getGradientColor(wellArea.up, scale));
  const down: Gradient = useMap(wellArea.down, getGradientColor(wellArea.up, scale));

  const data = useMap(depth, (value, index) => ({ x: value, y: wellArea.border[index] }));

  const x = useCallback((value: CurveValue) => xScale(value.x), [xScale]);
  const y = useCallback((value: CurveValue) => yScale(value.y ?? 0), [yScale]);

  const value = useCurveTrack({ key, width, height, domain: yDomain });

  useGradientAxis(key, { key, gradient, domain, name, height });

  return (
    <CurveTrackContext.Provider value={value}>
      <div className={styles.model}>
        <svg width={width} height={height}>
          <LinearGradient id="up-well-area" gradient={up} />
          <LinearGradient id="down-well-area" gradient={down} />
          <rect width={width} height={height} x={0} y={0} fill="url(#down-well-area)" />
          <LinePath data={data} x={x} y={y} stroke={borders.horizontal?.color} strokeWidth={borders.horizontal?.thickness} />
          <AreaClosed yScale={yScale} data={data} x={x} y={y} fill="url(#up-well-area)" curve={curveLinear} />
          <GridColumns
            width={width}
            height={height}
            scale={xScale}
            tickValues={xTicks}
            stroke={borders.vertical?.color}
            strokeWidth={borders.vertical?.thickness}
            strokeDasharray="5,4"
          />
          {children}
        </svg>
      </div>
    </CurveTrackContext.Provider>
  );
};
