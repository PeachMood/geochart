import { type LineStyle, type Scale, Borders } from 'types';

export const DEFAULT_NAME: string = 'Модель';

export const DEFAULT_SCALE: Scale = 'linear';

export const DEFAULT_HEIGHT: number = 360;

const DEFAULT_HORISONTAL_BORDER: LineStyle = { color: '#BB4430', thickness: 3, type: 'solid' };

const DEFAULT_VERTICAL_BORDER: LineStyle = { color: '#BB4430', thickness: 2, type: 'solid' };

export const DEFAULT_BORDERS: Borders = { horizontal: DEFAULT_HORISONTAL_BORDER, vertical: DEFAULT_VERTICAL_BORDER };

export const RANGE_START = 0;
