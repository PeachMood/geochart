import { useMemo } from 'react';

import { type Model, type Ticks, MultiModel, WellArea } from 'types';

const DEFAULT_INTERVAL = 10;
const DEGREES_PER_RADIANS = Math.PI / 180;

function getInRadians(angle: number) {
  return angle * DEGREES_PER_RADIANS;
}

function calculateBorder(alpha: number, x: number, x0: number, y0: number, ratio: number) {
  return (Math.tan(alpha) * (x - x0)) / ratio + y0;
}

function getWellArea(multiModel: MultiModel, ticks: Ticks, ratio: number) {
  const { domain, interval: step = DEFAULT_INTERVAL } = ticks;
  const area: WellArea = { up: [], down: [], border: [], palette: [] };

  if (multiModel.length === 0) {
    return area;
  }

  let index = 0;
  let model = multiModel[index];
  area.palette.push(model.roUp, model.roDown);

  for (let x = domain.min; x <= domain.max; x += step) {
    if (index < multiModel.length - 1 && multiModel[index + 1].x < x) {
      model = multiModel[++index];
      area.palette.push(model.roUp, model.roDown);
    }

    const alpha = getInRadians(model.alpha);
    const border = calculateBorder(alpha, x, model.x, model.y, ratio);

    area.border.push(border);
    area.up.push(model.roUp);
    area.down.push(model.roDown);
  }

  return area;
}

export default function useMultiModel(multiModel: Model[] = [], depth: Ticks, ratio: number) {
  const { domain, interval } = depth;
  const { min, max } = domain;

  const value = useMemo(() => {
    const domain = { min, max };
    const ticks = { domain, interval };
    const area = getWellArea(multiModel, ticks, ratio);
    return area;
  }, [multiModel, ratio, interval, min, max]);

  return value;
}
