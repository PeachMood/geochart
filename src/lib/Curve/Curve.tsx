import { useCallback, useContext } from 'react';
import { LinePath } from '@visx/shape';

import { type Component, type Data, type LineStyle, type Domain, type CurveValue } from 'types';
import CurveTrackContext from 'context/CurveTrackContext';
import LogViewContext from 'context/LogViewContext';
import useCurveAxis from 'hooks/useCurveAxis';
import useKey from 'hooks/useKey';
import useDomain from 'hooks/useDomain';
import useScale from 'hooks/useScale';
import useTicks from 'hooks/useTicks';

import { DEFAULT_NAME, DEFAULT_STYLE } from './constants';

export interface CurveProps {
  name: string;
  data: Data;
  style: LineStyle;
  domain: Partial<Domain>;
  isContinuous: boolean;
}

export const Curve: Component<Partial<CurveProps>> = (props) => {
  const { name = DEFAULT_NAME, style = DEFAULT_STYLE } = props;

  const logView = useContext(LogViewContext);
  const curveTrack = useContext(CurveTrackContext);

  const key = useKey();
  const domain = useDomain(props.domain, props.data, curveTrack.scale);

  const xRange = [0, curveTrack.width];
  const xScale = useScale(xRange, logView.domain);

  const yDomain = curveTrack?.domain ? curveTrack?.domain : domain;
  const yRange = curveTrack?.range ? curveTrack?.range : [curveTrack.height, 0];
  const yScale = useScale(yRange, yDomain, curveTrack.scale);

  const depth = useTicks(logView.depth);
  const data = depth.map((value, index) => ({ x: value, y: (props.data ?? [])[index] }));

  const x = useCallback((value: CurveValue) => xScale(value.x), [xScale]);
  //TODO: Fix y data scale
  const y = useCallback(
    (value: CurveValue) => (value.y === null || (curveTrack.scale === 'logarithmic' && value.y <= 0) ? 0.01 : yScale(value.y)),
    [yScale, curveTrack.scale],
  );

  const ticks = { ...curveTrack, domain: yDomain };
  const axis = { ...style, ...curveTrack, key, name, ticks };
  useCurveAxis(curveTrack.key, axis);

  return <LinePath data={data} x={x} y={y} stroke={style.color} strokeWidth={style.thickness} />;
};
