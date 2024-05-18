import { Component } from 'types';

import NumericAxis from './NumericAxis';
import GradientAxis from './GradientAxis';
import Placeholder from './Placeholder';
import { isGradientAxis, isNumericAxis, isPlaceholder } from './utils';

export enum AxisType {
  Numeric = 'numeric',
  Gradient = 'gradient',
  Placeholder = 'placeholder',
}

export interface AxisProps {
  key: string;
  name?: string;
  type?: AxisType;
}

export const Axis: Component<AxisProps> = (axis) => {
  if (isNumericAxis(axis)) {
    return <NumericAxis {...axis} />;
  } else if (isGradientAxis(axis)) {
    return <GradientAxis {...axis} />;
  } else if (isPlaceholder(axis)) {
    return <Placeholder {...axis} />;
  } else {
    return null;
  }
};
