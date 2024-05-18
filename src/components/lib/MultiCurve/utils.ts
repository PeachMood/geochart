import { type Data, type Domain } from 'types';

import { type ColumnDatum } from './MultiCurve';

export function isNotNull<T>(value: T): value is T {
  return value !== null;
}

export function createBin(data: Data[]): (value: number, index: number) => ColumnDatum {
  return (_: number, index: number) => ({
    bin: index,
    bins:
      data[index]?.map((count, bin) => ({
        count,
        bin,
      })) || [],
  });
}

export function getBinCount(indexes: Required<Domain>): number {
  return indexes.max - indexes.min;
}

export function getBinKey(column: number, row: number): string {
  return `key-curve-axis-${column}-${row}`;
}
