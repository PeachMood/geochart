import { useCallback, useContext } from 'react';
import { LinePath } from '@visx/shape';

import { type Component, type CurveProps, type CurveValue } from 'types';
import CurveTrackContext from 'context/CurveTrackContext';
import LogViewContext from 'context/LogViewContext';
import useCurveAxis from 'hooks/context/useCurveAxis';
import useKey from 'hooks/utils/useKey';
import useDomain from 'hooks/utils/useDomain';
import useScale from 'hooks/utils/useScale';
import useTicks from 'hooks/utils/useTicks';

import { DEFAULT_NAME, DEFAULT_STYLE } from './constants';

const Curve: Component<Partial<CurveProps>> = (props) => {
  const { name = DEFAULT_NAME, style = DEFAULT_STYLE } = props;

  const logView = useContext(LogViewContext);
  const curveTrack = useContext(CurveTrackContext);

  const key = useKey();
  const domain = useDomain(props.domain, props.data, curveTrack.scale);

  const xRange = { start: 0, end: curveTrack.width };
  const xScale = useScale(xRange, logView.domain, curveTrack.scale);

  const yRange = { start: curveTrack.height, end: 0 };
  const yScale = useScale(yRange, domain);

  const depth = useTicks(logView.depth);
  const data = depth.map((value, index) => ({ x: value, y: (props.data ?? [])[index] }));

  const x = useCallback((value: CurveValue) => xScale(value.x), [xScale]);
  const y = useCallback((value: CurveValue) => yScale(value.y ?? 0), [yScale]);

  const ticks = { ...curveTrack, domain };
  const axis = { ...style, ...curveTrack, key, name, ticks };
  useCurveAxis(curveTrack.key, axis);

  return <LinePath data={data} x={x} y={y} stroke={style.color} strokeWidth={style.thickness} />;
};

export default Curve;
