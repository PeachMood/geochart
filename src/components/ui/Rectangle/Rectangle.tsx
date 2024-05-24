import { type FC } from 'react';

import { type Coordinates, type Size } from 'types';

import { DEFAULT_FLIP_TRANSFORM, DEFAULT_OFFSET } from './constants';
import { getUrl } from './utils';

export interface RectangleProps {
  id: string;
  coordinates: Coordinates;
  size: Size;
  isFlipped: boolean;
}

export const Rectangle: FC<RectangleProps> = ({ id, coordinates, size, isFlipped }) => {
  const y = coordinates.y - (isFlipped ? size.height : DEFAULT_OFFSET);
  const transform = isFlipped ? 'scale(1,-1)' : DEFAULT_FLIP_TRANSFORM;

  return <rect x={coordinates.x} width={size.width} height={size.height} y={y} transform={transform} fill={getUrl(id)} />;
};
