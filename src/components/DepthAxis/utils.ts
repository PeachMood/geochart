import { format } from '@visx/vendor/d3-format';

export function getTickFormat(isLabeled: boolean): (n: number | { valueOf(): number }) => string {
  if (!isLabeled) {
    return () => '';
  }
  return format('.0f');
}
