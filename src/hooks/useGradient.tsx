import { useCallback } from 'react';

import { type Data, type GradientColor, type Domain, type Color, ColorScale } from 'types';
import { type Gradient, type Palette, type Scale } from 'types';

import useDomain from 'hooks/useDomain';
import useSort from 'hooks/useSort';
import useScale from 'hooks/useScale';
import useMap from 'hooks/useMap';

const DEFAULT_SCALE: Scale = 'linear';

const DEFAULT_GRADIENT: Gradient = [
  { value: '#fbbb3b', position: 0 },
  { value: '#f15025', position: 1 },
];

const DEFAULT_NULL_COLOR: Color = 'transparent';

function compareByPosition(a: GradientColor, b: GradientColor): number {
  return a.position - b.position;
}

function getTick(domain: Required<Domain>) {
  const gap = domain.max - domain.min;
  return (color: GradientColor) => domain.min + color.position * gap;
}

function getColorValue(color: GradientColor): Color {
  return color.value;
}

export default function useGradient(palette: Palette = {}, data: Data = []) {
  const { domain, gradient = DEFAULT_GRADIENT, scale = DEFAULT_SCALE } = palette;

  const fullDomain = useDomain(domain, data, scale);
  const sortedGradient = useSort<GradientColor>(gradient, compareByPosition);
  const ticks = useMap(sortedGradient, getTick(fullDomain));
  const colorRange = useMap(sortedGradient, getColorValue);
  const visxScale = useScale<Color>(colorRange, undefined, ticks, scale);

  const colorScale = useCallback<ColorScale>((value) => (value === null ? DEFAULT_NULL_COLOR : visxScale(value)), [visxScale]);

  return { scale: colorScale, gradient: sortedGradient, domain: fullDomain };
}
