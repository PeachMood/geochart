import { DataValue, Scale, type Data, type Domain } from 'types';

import { type ColumnDatum } from './MultiCurve';

export function isNotNull<T>(value: T): value is T {
  return value !== null;
}

function fitInDomain(value: DataValue, domain: Required<Domain>, scale: Scale): DataValue {
  if (value === null || scale === 'linear') {
    return value;
  }
  return Math.max(value, domain.min);
}

export function createBin(data: Data[], domain: Required<Domain>, scale: Scale = 'linear'): (value: number, index: number) => ColumnDatum {
  return (_: number, depth: number) => ({
    bin: depth,
    bins:
      data?.map((curve, index) => ({
        count: fitInDomain(curve[depth], domain, scale),
        bin: index,
      })) || [],
  });
}

export function getBinCount(indexes: Required<Domain>): number {
  return indexes.max - indexes.min;
}

export function getBinKey(column: number, row: number): string {
  return `key-curve-axis-${column}-${row}`;
}
