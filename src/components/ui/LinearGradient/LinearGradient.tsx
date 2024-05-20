import { FC } from 'react';
import { LinearGradient as VisxGradient } from '@visx/gradient';

import { type Orientation, type Gradient, Scale } from 'types';
import useGradient from 'hooks/useGradient';

import { isVertical, getOffset } from './utils';

export interface LinearGradientProps {
  id: string;
  gradient?: Gradient;
  orientation?: Orientation;
  scale?: Scale;
}

export const LinearGradient: FC<LinearGradientProps> = (props) => {
  const { id, gradient, orientation, scale } = props;

  const palette = useGradient({ gradient, scale });

  return (
    <VisxGradient id={id} vertical={isVertical(orientation)}>
      {palette.gradient.map((color, index) => (
        <stop key={`stop-${index}`} stopColor={color.value} offset={getOffset(color.position)} />
      ))}
    </VisxGradient>
  );
};
