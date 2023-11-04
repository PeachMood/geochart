type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;
export type LineType = 'solid' | 'dotted' | 'dashed';

export default interface ILineStyle {
  color: Color;
  thickness: number;
  type: LineType;
}
