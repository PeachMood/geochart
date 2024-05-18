import { Color, Size, TextAnchor } from 'types';
import { format } from '@visx/vendor/d3-format';
import { LABEL_PADDING, TICK_LABEL_PROPS } from './constants';

export function getTickFormat(isLabeled: boolean): (n: number | { valueOf(): number }) => string {
  if (!isLabeled) {
    return () => '';
  }
  return format('.0f');
}

export function tickLabelProps(size: Size, color?: Color) {
  return (_: unknown, index: number) => ({
    y: size.height - LABEL_PADDING,
    fill: color,
    textAnchor: (index === 0 ? 'start' : 'middle') as TextAnchor,
    ...TICK_LABEL_PROPS,
  });
}
