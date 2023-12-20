import { type FC } from 'react';

import Axis from 'components/Axis';
import DepthAxis from 'components/DepthAxis';
import { type Axis as AxisProps, type DepthAxis as DepthAxisProps } from 'utils/types';
import { groupBy } from 'utils/utils';

import styles from './Header.module.css';

export interface HeaderProps {
  depth?: DepthAxisProps;
  axes: AxisProps[];
}

const Header: FC<HeaderProps> = ({ depth, axes }) => {
  const tracks = groupBy<AxisProps>('track', axes);
  const keys = Object.keys(tracks);

  if (keys.length === 0 && !depth) {
    return null;
  }

  return (
    <header className={styles.axes}>
      <ul className={styles.list}>
        {keys.sort().map((key) => (
          <li className={styles.item} key={key}>
            {tracks[key].map((axis) => (
              <Axis {...axis} key={axis.key} />
            ))}
          </li>
        ))}
        {depth && (
          <li className={styles.depth}>
            <DepthAxis {...depth} />
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
