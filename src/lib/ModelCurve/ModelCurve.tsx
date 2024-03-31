import { useCallback, useContext } from 'react';
import { AreaClosed, LinePath } from '@visx/shape';
import { GridColumns } from '@visx/grid';

import { Component, Palette, Borders, Domain, ModelData as Data, Point } from 'types';
import LogViewContext from 'context/LogViewContext';
import CurveTrackContext from 'context/CurveTrackContext';
import PaletteShape from 'components/PaletteShape';
import useCurveTrack from 'hooks/useCurveTrack';
import useScale from 'hooks/useScale';
import useScope from 'hooks/useScope';
import useDomain from 'hooks/useDomain';
import useModel from 'hooks/useModel';
import useTicks from 'hooks/useTicks';
import useKey from 'hooks/useKey';

import { DEFAULT_BORDERS, DEFAULT_HEIGHT, RANGE_START } from './constants';
import styles from './ModelCurve.module.css';

export interface ModelCurveProps {
  name: string;
  height: number;
  palette: Palette;
  borders: Borders;
  data: Data;
  domain: Partial<Domain>;
}

export const ModelCurve: Component<Partial<ModelCurveProps>> = (props) => {
  const { height = DEFAULT_HEIGHT, borders = DEFAULT_BORDERS } = props;
  const { palette, children } = props;

  const logView = useContext(LogViewContext);
  const width = useScope(logView.domain, logView.scope);
  const depth = useTicks(logView.depth);
  // TODO: Refactoring
  const model = useModel(props.data, logView.depth);
  const key = useKey();

  const xRange = [RANGE_START, width];
  const xScale = useScale(xRange, logView.domain);

  const yRange = [RANGE_START, height];
  const yDomain = useDomain(props.domain, model.y);
  const yScale = useScale(yRange, yDomain);

  // TODO: Refactoring
  const ro = props.data?.reduce<number[]>((ro, model) => [...ro, model.roUp, model.roDown], []);
  const roDomain = useDomain(palette?.domain, ro);

  const data = depth.map((value, index) => ({ x: value, y: model.y[index] }));

  const x = useCallback((value: Point<number, number>) => xScale(value.x), [xScale]);
  const y = useCallback((value: Point<number, number>) => yScale(value.y), [yScale]);

  const value = useCurveTrack({ key, scale: 'linear', width, height, range: yRange, domain: yDomain });

  return (
    <CurveTrackContext.Provider value={value}>
      <div className={styles.model}>
        <svg width={width} height={height}>
          <PaletteShape id="up" data={model.ro.map((ro) => ro.up)} domain={roDomain} gradient={palette?.gradient} scale={palette?.scale} />
          <PaletteShape id="down" data={model.ro.map((ro) => ro.down)} domain={roDomain} gradient={palette?.gradient} scale={palette?.scale} />
          <rect x={0} y={0} width={width} height={height} fill={'url(#down)'} />
          <LinePath data={data} x={x} y={y} stroke={borders.vertical?.color} strokeWidth={borders.vertical?.thickness} />
          <AreaClosed fill={'url(#up)'} yScale={yScale} data={data} x={x} y={y} />
          <GridColumns
            scale={xScale}
            width={width}
            height={height}
            stroke={borders.vertical?.color}
            strokeWidth={borders.vertical?.thickness}
            tickValues={model.x}
            strokeDasharray="5,4"
          />
          {children}
        </svg>
      </div>
    </CurveTrackContext.Provider>
  );
};
