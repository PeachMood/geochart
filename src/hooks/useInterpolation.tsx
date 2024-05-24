import { Scale, type Data, type DataValue } from 'types';

import useMap from 'hooks/useMap';

const DEFAULT_DATA_VALUE: number = 0;
const DEFAULT_LOG_OFFSET: number = 1;

function scaleLog(value: number): number {
  return value <= 0 ? DEFAULT_LOG_OFFSET : value;
}

function interpolate(isContinuous: boolean, data: Data, scale: Scale) {
  return (value: DataValue, index: number) => {
    let interpolatedValue = value || DEFAULT_DATA_VALUE;
    if (isContinuous && value === null) {
      const prevValue = data[index - 1] ?? DEFAULT_DATA_VALUE;
      const nextValue = data[index + 1] ?? DEFAULT_DATA_VALUE;
      interpolatedValue = (prevValue + nextValue) / 2;
    }
    return scale === 'logarithmic' ? scaleLog(interpolatedValue) : interpolatedValue;
  };
}

export default function useInterpolation(isContinuous: boolean, data: Data = [], scale: Scale = 'logarithmic') {
  const interpolatedData = useMap(data, interpolate(isContinuous, data, scale));
  return interpolatedData;
}
