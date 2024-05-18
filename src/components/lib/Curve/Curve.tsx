import { useCallback, useContext } from 'react';
import { LinePath } from '@visx/shape';

import { type Component, type Data, type LineStyle, type Domain, type Coordinates } from 'types';
import CurveTrackContext from 'context/CurveTrackContext';
import LogViewContext from 'context/LogViewContext';
import useCurveAxis from 'hooks/useCurveAxis';
import useKey from 'hooks/useKey';
import useDomain from 'hooks/useDomain';
import useScale from 'hooks/useScale';
import useTicks from 'hooks/useTicks';
import useRange from 'hooks/useRange';
import useMap from 'hooks/useMap';
import useInterpolation from 'hooks/useInterpolation';

import { DEFAULT_CONTINUITY, DEFAULT_NAME, DEFAULT_STYLE, RANGE_START } from './constants';

export interface CurveProps {
  name: string;
  data: Data;
  style: LineStyle;
  domain: Domain;
  isContinuous: boolean;
}

export const Curve: Component<Partial<CurveProps>> = (props) => {
  const { name = DEFAULT_NAME, style = DEFAULT_STYLE, isContinuous = DEFAULT_CONTINUITY } = props;

  const logView = useContext(LogViewContext);
  const curveTrack = useContext(CurveTrackContext);
  const data = useInterpolation(isContinuous, props.data, curveTrack.scale);

  const key = useKey();

  const xRange = [RANGE_START, curveTrack.width];
  const xScale = useScale(xRange, logView.domain);

  const yRange = useRange([curveTrack.height, RANGE_START], curveTrack.position);
  const yDomain = useDomain(props.domain, data, curveTrack.scale);
  const yScale = useScale(yRange, yDomain, undefined, curveTrack.scale);

  const depth = useTicks(logView.depth);
  const curve = useMap(depth, (value, index) => ({ x: value, y: data[index] }));

  const cxScale = useCallback((value: Coordinates) => xScale(value.x), [xScale]);
  const cyScale = useCallback((value: Coordinates) => yScale(value.y), [yScale]);

  const ticks = { ...curveTrack, domain: yDomain };
  const axis = { ...curveTrack, color: style.color, key, name, ticks };
  useCurveAxis(curveTrack.key, axis);

  return <LinePath data={curve} x={cxScale} y={cyScale} stroke={style.color} strokeWidth={style.thickness} />;
};
