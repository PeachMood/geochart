import { type FC, type ReactNode } from 'react';
import { type AxisScale } from '@visx/axis';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Component<T> = FC<Partial<T & { className?: string; children?: ReactNode }>>;

export type Scale = 'linear' | 'logarithmic';
export type Orientation = 'horizontal' | 'vertical';
export type LineType = 'solid' | 'dotted' | 'dashed';
export type Units = 'м' | 'км' | 'фт';
export type Color = string;

export type DataValue = number | null;
export type Data = DataValue[];

export type DepthValue = number;
export type Depth = DepthValue[];

export interface CurveValue {
  x: DepthValue;
  y: DataValue;
}
export type CurveData = CurveValue[];

export interface Text {
  value?: string;
  color?: Color;
}

export interface Size {
  width: number;
  height: number;
}

export interface Domain {
  min?: number;
  max?: number;
}

export interface LineStyle {
  color?: Color;
  thickness?: number;
  type?: LineType;
}

export interface Grid {
  main?: {
    style?: LineStyle;
    [key: string]: any;
  };
  secondary?: {
    style?: LineStyle;
    [key: string]: any;
  };
}

export interface LogView {
  name: string;
  scope: number;
  orientation: Orientation;
  units: Units;
  domain: Domain;
  grid: Grid;
  depth: Depth;
  width: number;
  height: number;
}

export interface CurveTrack {
  name: string;
  width: number;
  grid: Grid;
  scale: Scale;
}

export interface Curve {
  name: string;
  style: LineStyle;
  isContinuous: boolean;
  domain: Domain;
  data: Data;
}

export interface Axis {
  key?: string;
  name: string;
  track: string;
  ticks: number[];
  color?: Color;
  width: number;
  scale: AxisScale;
  orientation: Orientation;
}

export interface DepthCurve {
  name?: string;
  color?: Color;
  floatingPoint?: number;
}

export interface DepthTrack {
  name: string;
  width: number;
  main: DepthCurve;
  secondary?: DepthCurve;
}

export interface DepthAxis {
  width: number;
  scope: number;
  units: Units;
  main: DepthCurve;
  secondary?: DepthCurve;
  orientation: Orientation;
}
