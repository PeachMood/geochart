import { type Component, type Coordinates } from 'types';

import { DEFAULT_STD_DEVIATION, DEFAULT_ID, DEFAULT_POSITION } from './constants';

export interface GaussianBlurProps {
  id?: string;
  position?: Coordinates;
  stdDeviation?: Coordinates;
}

export const GaussianBlur: Component<GaussianBlurProps> = (props) => {
  const { id = DEFAULT_ID, position = DEFAULT_POSITION, stdDeviation = DEFAULT_STD_DEVIATION } = props;

  return (
    <defs>
      <filter id={id} x={position.x} y={position.y}>
        <feGaussianBlur in="SourceGraphic" stdDeviation={`${stdDeviation.x},${stdDeviation.y}`} />
      </filter>
    </defs>
  );
};
