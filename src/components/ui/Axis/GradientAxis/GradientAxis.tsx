import { Position, Component, Domain, Gradient, Scale, Ticks } from 'types';
import { type AxisProps } from 'components/ui/Axis';
import NumericAxis from 'components/ui/Axis/NumericAxis';
import LinearGradient from 'components/ui/LinearGradient';
import Rectangle from 'components/ui/Rectangle';

import { DEFAULT_AXIS_WIDTH, DEFAULT_COLORS, DEFAULT_COORDINATES, DEFAULT_LINES_COUNT } from './constants';
import { getContrastColor, getGradientId, getAxisPosition, isFlipped } from './utils';

export interface GradientAxisProps extends AxisProps {
  height: number;
  domain: Required<Domain>;
  gradient?: Gradient;
  scale?: Scale;
  position?: Position;
  ticks?: Ticks;
}

export const GradientAxis: Component<GradientAxisProps> = (props) => {
  const { key, name, height, domain, gradient, position, scale, ticks } = props;

  const id = getGradientId(name);
  const labelColor = getContrastColor(gradient);
  const gradientPosition = getAxisPosition(position);
  const gradientTicks = { lines: DEFAULT_LINES_COUNT, domain };
  const size = { width: DEFAULT_AXIS_WIDTH, height };

  return (
    <svg width={size.width} height={size.height}>
      <LinearGradient id={id} gradient={gradient} orientation="vertical" />
      <Rectangle id={id} coordinates={DEFAULT_COORDINATES} size={{ width: size.width / 2, height }} isFlipped={isFlipped(position)} />
      <NumericAxis
        key={key}
        name={name}
        scale={scale}
        height={height}
        ticks={gradientTicks}
        color={labelColor}
        position={gradientPosition}
        isHiddenLine
      />
      {ticks && <NumericAxis key={key} scale={scale} height={height} ticks={ticks} position={position} color={DEFAULT_COLORS.DARK} isHiddenLabel />}
    </svg>
  );
};
