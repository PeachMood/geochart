import { type FC, type ReactNode } from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Component<T> = FC<T & { className?: string; children?: ReactNode }>;
export type Comparator<T> = (first: T, second: T) => number;
export type Predicate<T> = (value: T) => boolean;
export type Accessor<T, S> = (value: T, index: number) => S;
export type ColorScale = (value: any) => string;

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

export type CurveValue = Point<DepthValue, DataValue>;
export type CurveData = CurveValue[];

export type Coordinates = Point<number, number>;

interface Point<X, Y> {
  x: X;
  y: Y;
}

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

export type Range<T = number> = Array<T>;

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

export interface DepthCurve {
  name?: string;
  color?: Color;
  floatingPoint?: number;
}

export interface GradientColor {
  value: Color;
  position: number;
}

export type Gradient = GradientColor[];

export interface Palette {
  gradient?: Gradient;
  domain?: Domain;
  scale?: Scale;
}

export interface Borders {
  horizontal?: LineStyle;
  vertical?: LineStyle;
}

export interface Model {
  x: number;
  y: number;
  alpha: number;
  roUp: number;
  roDown: number;
}

export type MultiModel = Model[];

export interface WellArea {
  up: number[];
  down: number[];
  border: number[];
  palette: number[];
}

export type TextAnchor = 'start' | 'middle' | 'end';
