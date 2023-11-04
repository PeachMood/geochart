import ILineStyle from '../types/ILineStyle';

export type Orientation = 'horizontal' | 'vertical';
export type Units = 'm' | 'km' | 'ft';

export interface IRange {
  minDepth?: number;
  maxDepth?: number;
}

export interface IGrid {
  main?: {
    style: ILineStyle;
    interval: number;
  };
  secondary?: {
    style: ILineStyle;
    lines: number;
  };
}

export default interface ILogView {
  name?: string;
  scope?: number;
  orientation?: Orientation;
  units?: Units;
  range?: IRange;
  grid?: IGrid;
}
