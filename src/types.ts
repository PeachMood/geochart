import { type FC, type ReactNode } from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Component<T> = FC<T & { className?: string; children?: ReactNode }>;

export type Scale = 'linear' | 'logarithmic';
export type Orientation = 'horizontal' | 'vertical';
export type LineType = 'solid' | 'dotted' | 'dashed';
export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Units = 'm' | 'km' | 'ft';
export type GridType = 'main' | 'secondary' | 'uniform';
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

export interface Range {
  start?: number;
  end?: number;
}

export interface Ticks {
  domain: Required<Domain>;
  interval?: number;
  lines?: number;
}

export interface LineStyle {
  color?: Color;
  thickness?: number;
  type?: LineType;
}

export interface VerticalGrid {
  main?: {
    style?: LineStyle;
    interval?: number;
  };
  secondary?: {
    style?: LineStyle;
    lines?: number;
  };
}

export interface HorizontalGrid {
  main?: {
    lines?: number;
    isDisplayed?: boolean;
  };
  secondary?: {
    lines?: number;
    leftOffset?: number;
    rightOffset?: number;
    isDisplayed?: boolean;
  };
}

export interface LogViewProps {
  name: string;
  scope: number;
  orientation: Orientation;
  units: Units;
  domain: Domain;
  depth: Depth;
  grid: VerticalGrid;
}

export interface CurveTrackProps {
  name: string;
  height: number;
  scale: Scale;
  grid: HorizontalGrid;
}

export interface CurveProps {
  name: string;
  data: Data;
  style: LineStyle;
  domain: Domain;
  isContinuous: boolean;
}

export interface AxisProps {
  key: string;
  name: string;
  height: number;
  scale: Scale;
  color?: Color;
  ticks: Ticks;
}

export interface DepthCurve {
  name?: string;
  color?: Color;
  floatingPoint?: number;
}

export interface DepthTrackProps {
  name: string;
  height: number;
  main: DepthCurve;
  secondary?: DepthCurve;
}

export interface DepthHeaderProps {
  height: number;
  scope: number;
  units: Units;
  main: DepthCurve;
  secondary?: DepthCurve;
}
