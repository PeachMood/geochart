import { type FC } from 'react';
import { Axis as VisxAxis } from '@visx/axis';

import { type Axis as AxisProps } from 'utils/types';
import { axisBuilder, getAdjustedSize, getLabelPosition } from 'utils/utils';

import styles from './Axis.module.css';

const Axis: FC<AxisProps> = ({ name, ticks, color, width, scale, orientation }) => {
  const axis = axisBuilder(orientation);
  const size = getAdjustedSize(width, axis.height, orientation);

  return (
    <svg width={size.width} height={size.height}>
      <VisxAxis
        {...axis}
        scale={scale}
        stroke={color}
        label={name}
        labelClassName={styles.label}
        labelProps={{ fill: color }}
        tickClassName={styles.tick}
        tickValues={ticks}
        tickStroke={color}
        tickLabelProps={(_, index) => ({
          fill: color,
          textAnchor: getLabelPosition(index, ticks.length, orientation),
          ...axis.tickLabelProps,
        })}
      />
    </svg>
  );
};

export default Axis;
