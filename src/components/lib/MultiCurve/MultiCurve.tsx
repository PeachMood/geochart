import { useCallback, useContext } from 'react';
import { Group } from '@visx/group';
import { HeatmapRect } from '@visx/heatmap';

import { type Palette, type Domain, type Component, type Data, DataValue } from 'types';
import LogViewContext from 'context/LogViewContext';
import CurveTrackContext from 'context/CurveTrackContext';
import GaussianBlur from 'components/ui/GaussianBlur';
import useGradientAxis from 'hooks/useGradientAxis';
import useGradient from 'hooks/useGradient';
import useMap from 'hooks/useMap';
import useScale from 'hooks/useScale';
import useKey from 'hooks/useKey';
import useTicks from 'hooks/useTicks';

import { DEFAULT_MIN_VALUE, DEFAULT_NAME, DEFAULT_SMOOTHING } from './constants';
import { createBin, getBinCount, getBinKey } from './utils';

export interface BinDatum {
  count: DataValue;
  bin: number;
}

export interface ColumnDatum {
  bin: number;
  bins: BinDatum[];
}

export interface MultiCurveProps {
  name: string;
  isSmoothed: boolean;
  palette: Palette;
  indexes: Domain;
  data: Data[];
}

export const MultiCurve: Component<Partial<MultiCurveProps>> = (props) => {
  const { name = DEFAULT_NAME, isSmoothed = DEFAULT_SMOOTHING } = props;
  const { indexes = {}, data = [] } = props;

  const key = useKey();
  const logView = useContext(LogViewContext);
  const curveTrack = useContext(CurveTrackContext);

  //TODO: Change gradient domain for indexes
  const { gradient, domain, scale: colorScale } = useGradient(props.palette, data.flat(1));

  const xRange = [DEFAULT_MIN_VALUE, curveTrack.width];
  const xScale = useScale(xRange, logView.domain);

  const yRange = [curveTrack.height, DEFAULT_MIN_VALUE];
  const yDomain = { min: indexes.min || DEFAULT_MIN_VALUE, max: indexes.max || data[0].length };
  const yScale = useScale(yRange, yDomain);
  const yTicks = { domain: yDomain, lines: 0 };

  const depth = useTicks(logView.depth);
  const heatmap = useMap(depth, createBin(data));

  const binHeight = curveTrack.height / getBinCount(yDomain);
  const binWidth = curveTrack.width / depth.length;

  const cxScale = useCallback((column: number) => xScale(depth[column]), [xScale, depth]);
  const cyScale = useCallback((row: number) => yScale(row), [yScale]);

  useGradientAxis(curveTrack.key, { ...curveTrack, gradient, domain, key, name, ticks: yTicks });

  return (
    <svg width={curveTrack.width} height={curveTrack.height}>
      {isSmoothed && <GaussianBlur id="multi-curve-blur" />}
      <Group filter="url(#multi-curve-blur)">
        <HeatmapRect<ColumnDatum, BinDatum>
          data={heatmap}
          xScale={cxScale}
          yScale={cyScale}
          colorScale={colorScale}
          binHeight={binHeight}
          binWidth={binWidth}
          gap={-binHeight}
        >
          {(heatmap) =>
            heatmap?.map((bins) =>
              bins?.map((bin) => (
                <rect key={getBinKey(bin.column, bin.row)} width={bin.width} height={bin.height} fill={bin.color} x={bin.x} y={bin.y} />
              )),
            )
          }
        </HeatmapRect>
      </Group>
    </svg>
  );
};
