import { useEffect, useMemo } from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';

import useLogView from 'hooks/useLogView';
import useCurveTrack from 'hooks/useCurveTrack';
import useAxes from 'hooks/useAxes';
import useKey from 'hooks/useKey';
import { defaultCurve } from 'utils/constants';
import { getDomain, scaleBuilder, ticksBuilder } from 'utils/utils';
import { type Axis, type Component, type Curve as CurveProps, type CurveValue } from 'utils/types';

const Curve: Component<CurveProps> = (props) => {
  const key = useKey();
  const logView = useLogView();
  const curveTrack = useCurveTrack();
  const axes = useAxes();
  const curve = useMemo(() => {
    const value = { ...defaultCurve, ...props };
    value.domain = { ...getDomain(value.data), ...value.domain };
    return value;
  }, [props]);

  const xScale = scaleLinear<number>({
    domain: [logView.domain.min!, logView.domain.max!],
    range: [0, curveTrack.height],
  });

  const yScale = useMemo(() => {
    return scaleBuilder(curveTrack.scale)<number>({
      domain: [curve.domain.min!, curve.domain.max!],
      range: [curveTrack.width - 2, 0],
    });
  }, [curve.domain, curveTrack.width]);

  const data = logView.depth.map((value, index) => ({ x: value, y: curve.data[index] }));
  const x = (value: CurveValue) => xScale(value.x);
  const y = (value: CurveValue) => yScale(value.y ?? 0);

  useEffect(() => {
    const ticks = ticksBuilder(curveTrack.scale);
    const axis: Axis = {
      key,
      scale: yScale,
      name: curve.name,
      color: curve.style.color,
      track: curveTrack.key,
      width: curveTrack.width,
      ticks: ticks(curve.domain),
      orientation: logView.orientation,
    };
    axes.addAxis(axis);

    return () => {
      axes.deleteAxis(key);
    };
  }, [key, yScale, curve.name, curve.style, curveTrack.width, curveTrack.scale, curveTrack.key, logView.orientation]);

  return <LinePath data={data} x={x} y={y} stroke={curve.style.color} strokeWidth={curve.style.thickness} />;
};

export default Curve;
