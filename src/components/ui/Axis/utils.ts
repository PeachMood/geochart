import { AxisProps as Axis, AxisType } from './Axis';
import { GradientAxisProps as GradientAxis } from './GradientAxis';
import { NumericAxisProps as NumericAxis } from './NumericAxis';
import { PlaceholderProps as Placeholder } from './Placeholder';

export function isNumericAxis(axis: Axis): axis is NumericAxis {
  return axis.type === AxisType.Numeric;
}

export function isGradientAxis(axis: Axis): axis is GradientAxis {
  return axis.type === AxisType.Gradient;
}

export function isPlaceholder(axis: Axis): axis is Placeholder {
  return axis.type === AxisType.Placeholder;
}
