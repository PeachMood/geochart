import { Text as VisxText } from '@visx/text';
import classNames from 'classnames';

import { type Component, type Units, type DepthCurve } from 'types';

import { DEFAULT_DEPTH } from './constants';
import { getDepthAxisText, getPosition } from './utils';
import styles from './DepthHeader.module.css';

export type Depth = DepthHeaderProps & DepthHeaderDefaults;

export interface DepthHeaderProps {
  height: number;
  scope: number;
  units: Units;
  main: DepthCurve;
  secondary?: DepthCurve;
}

export interface DepthHeaderDefaults {
  width: number;
  gap: number;
  y: number;
  x: string;
}

export const DepthHeader: Component<DepthHeaderProps> = (props) => {
  const depth = { ...DEFAULT_DEPTH, ...props };
  const text = getDepthAxisText(depth);

  return (
    <svg width={depth.width} height={depth.height}>
      {text.map((text, index) => (
        <VisxText
          key={text.value}
          className={classNames(styles.text, styles.rotated)}
          fill={text.color}
          x={depth.x}
          y={getPosition(depth.y, depth.gap, index)}
        >
          {text.value}
        </VisxText>
      ))}
    </svg>
  );
};
