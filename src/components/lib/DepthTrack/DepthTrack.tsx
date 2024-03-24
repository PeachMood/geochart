import { useContext } from 'react';

import { type Component, type DepthTrackProps } from 'types';
import { DepthAxis } from 'components/ui';
import LogViewContext from 'context/LogViewContext';
import useDepthTrack from 'hooks/context/useDepthTrack';
import useScope from 'hooks/utils/useScope';

import { DEFAULT_HEIGHT, DEFAULT_MAIN_DEPTH } from './constants';
import styles from './DepthTrack.module.css';

const DepthTrack: Component<Partial<DepthTrackProps>> = (props) => {
  const { height = DEFAULT_HEIGHT, main = DEFAULT_MAIN_DEPTH, secondary } = props;

  const { domain, grid, scope, units } = useContext(LogViewContext);

  const width = useScope(domain, scope);
  const size = { width, height: height / 2 };

  const ticks = { domain, interval: grid.main?.interval, lines: grid.secondary?.lines };

  useDepthTrack({ height, scope, units, main, secondary });

  return (
    <section className={styles.track}>
      <DepthAxis isLabeled position="bottom" size={size} ticks={ticks} color={main.color} />
      <DepthAxis position="top" size={size} ticks={ticks} color={main.color} />
    </section>
  );
};

export default DepthTrack;
