import { Axis as VisxAxis, Orientation } from '@visx/axis';
import { type TextProps } from '@visx/text';

import { type Component, type Position, type Scale, type Color, type Ticks } from 'types';
import { type AxisProps } from 'components/ui/Axis';
import useScale from 'hooks/useScale';
import useTicks from 'hooks/useTicks';
import useRange from 'hooks/useRange';

import { DEFAULT_AXIS_MAP, DEFAULT_COLOR, DEFAULT_HIDDEN_NAME, DEFAULT_NAME } from './constants';
import { DEFAULT_POSITION, HEIGHT_PADDING, RANGE_END } from './constants';
import { tickLabelProps } from './utils';
import styles from './NumericAxis.module.css';

export interface NumericAxisProps extends AxisProps {
  height: number;
  ticks: Ticks;
  scale?: Scale;
  color?: Color;
  position?: Position;
  isHiddenLine?: boolean;
  isHiddenLabel?: boolean;
}

export interface NumericAxisDefaults {
  width: number;
  hideAxisLine: boolean;
  hideTicks: boolean;
  strokeWidth: number;
  labelOffset: number;
  left: number;
  top: number;
  tickFormat: (n: number | { valueOf(): number }) => string;
  orientation: Position;
  tickTransform: string;
  tickLabelProps: TextProps;
}

export const NumericAxis: Component<NumericAxisProps> = (props) => {
  const { name = DEFAULT_NAME, color = DEFAULT_COLOR, position = DEFAULT_POSITION } = props;
  const { height, isHiddenLine, isHiddenLabel } = props;

  const axis = DEFAULT_AXIS_MAP[position];
  const label = isHiddenLabel ? DEFAULT_HIDDEN_NAME : name;
  const range = useRange([height - HEIGHT_PADDING, RANGE_END], position);
  const scale = useScale(range, props?.ticks?.domain, undefined, props.scale);
  const ticks = useTicks(props.ticks, props.scale);
  const labelProps = tickLabelProps(axis, ticks, position, color);

  return (
    <svg width={axis.width} height={height}>
      <VisxAxis
        {...axis}
        labelOffset={axis.labelOffset}
        orientation={Orientation.left}
        scale={scale}
        stroke={color}
        label={label}
        labelClassName={styles.label}
        labelProps={{ fill: color }}
        tickClassName={styles.tick}
        tickValues={ticks}
        tickStroke={color}
        tickLabelProps={labelProps}
        hideAxisLine={isHiddenLine}
        hideTicks={isHiddenLine}
      />
    </svg>
  );
};
