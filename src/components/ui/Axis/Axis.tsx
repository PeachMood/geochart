import { Orientation, Axis as VisxAxis } from '@visx/axis';

import { type Component, type AxisProps, Position } from 'types';
import useScale from 'hooks/utils/useScale';
import useTicks from 'hooks/utils/useTicks';

import { DEFAULT_LEFT_AXIS, HEIGHT_PADDING, RANGE_END } from './constants';
import { tickLabelProps } from './utils';
import styles from './Axis.module.css';

export interface AxisDefaults {
  width: number;
  strokeWidth: number;
  labelOffset: number;
  left: number;
  top: number;
  tickFormat: (n: number | { valueOf(): number }) => string;
  orientation: Position;
  tickTransform: string;
  tickLabelProps: { x?: number; y?: number; angle?: number };
}

const Axis: Component<AxisProps> = (props) => {
  const axis = DEFAULT_LEFT_AXIS;

  const range = { start: props.height - HEIGHT_PADDING, end: RANGE_END };
  const scale = useScale(range, props.ticks.domain, props.scale);
  const ticks = useTicks(props.ticks, props.scale);

  const labelProps = tickLabelProps(axis, ticks.length, props.color);

  return (
    <svg width={axis.width} height={props.height}>
      <VisxAxis
        {...axis}
        orientation={Orientation.left}
        scale={scale}
        stroke={props.color}
        label={props.name}
        labelClassName={styles.label}
        labelProps={{ fill: props.color }}
        tickClassName={styles.tick}
        tickValues={ticks}
        tickStroke={props.color}
        tickLabelProps={labelProps}
      />
    </svg>
  );
};

export default Axis;
