import { Accessor, ColorScale, GradientColor, type Model } from 'types';

export function compareByPosition(a: Model, b: Model): number {
  return a.x - b.x;
}

export function getPosition(model: Model) {
  return model.x;
}

export function getGradientColor(array: number[], scale: ColorScale): Accessor<number, GradientColor> {
  return (value: number, index: number) => ({ position: index / array.length, value: scale(value) });
}
