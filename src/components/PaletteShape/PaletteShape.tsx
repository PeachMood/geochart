import { FC } from 'react';
import { LinearGradient } from '@visx/gradient';

import { type Palette, type GradientColor, type Color } from 'types';
import useDomain from 'hooks/useDomain';

import { DEFAULT_GRADIENT, DEFAULT_ID, DEFAULT_SCALE } from './constants';
import { GRADIENT_OFFSET_PERCENT, GRADIENT_STOP_OPACITY } from './constants';
import useSort from 'hooks/useSort';
import useScale from 'hooks/useScale';

export interface PaletteShapeProps extends Palette {
  id?: string;
  data?: number[];
}

export const PaletteShape: FC<PaletteShapeProps> = (props) => {
  const { id = DEFAULT_ID, gradient = DEFAULT_GRADIENT, scale = DEFAULT_SCALE, data = [] } = props;

  const domain = useDomain(props.domain, data, scale);
  const colors = useSort<GradientColor>(gradient, (a, b) => a.position - b.position);
  const range = colors.map((color) => color.value);
  const colorScale = useScale<Color>(range, domain, scale);

  const sections = data.map((value, index) => ({
    offset: `${(index / data.length) * GRADIENT_OFFSET_PERCENT}%`,
    color: colorScale(value),
    opacity: GRADIENT_STOP_OPACITY,
  }));

  return (
    <LinearGradient id={id} vertical={false}>
      {sections.map((section, index) => (
        <stop key={`stop-${index}`} offset={section.offset} stopColor={section.color} stopOpacity={section.opacity} />
      ))}
    </LinearGradient>
  );
};
