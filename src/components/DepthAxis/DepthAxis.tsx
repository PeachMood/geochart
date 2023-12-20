import { type FC } from 'react';
import { Text } from '@visx/text';
import classNames from 'classnames';

import { type DepthAxis as DepthAxisProps } from 'utils/types';
import { getAdjustedSize, getDepthAxisText, getPosition } from 'utils/utils';
import { defaultDepthAxis } from 'utils/constants';

import styles from './DepthAxis.module.css';

const DepthAxis: FC<DepthAxisProps> = (props) => {
  const depthAxis = { ...defaultDepthAxis, ...props };
  const size = getAdjustedSize(depthAxis.width, depthAxis.height, depthAxis.orientation);
  const text = getDepthAxisText(depthAxis);

  return (
    <svg width={size.width} height={size.height}>
      {text.map((text, index) => (
        <Text
          key={index}
          className={classNames(styles.text, styles.rotated)}
          fill={text.color}
          x={depthAxis.x}
          y={getPosition(depthAxis.y, depthAxis.gap, index)}
        >
          {text.value}
        </Text>
      ))}
    </svg>
  );
};

export default DepthAxis;
