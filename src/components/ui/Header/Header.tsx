import { useMemo } from 'react';

import { type Component } from 'types';
import { Axis, type AxisProps } from 'components/ui/Axis';
import { DepthHeader, type DepthHeaderProps } from 'components/ui/DepthHeader';
import HeaderContext from 'context/HeaderContext';
import useHeader from 'hooks/useHeader';
import useStore from 'hooks/useStore';
import useValue from 'hooks/useValue';

import { getMaxWidth } from './utils';
import styles from './Header.module.css';

export type HeaderProps = Record<string, unknown>;

export const Header: Component<HeaderProps> = ({ children }) => {
  const axes = useStore<AxisProps>('name');
  const { value: depth, setValue: setDepth, deleteValue: deleteDepth } = useValue<DepthHeaderProps>();
  const { store, setItem: setAxis, getItem: getAxis, getItems: getAxes, deleteItem: deleteAxis } = axes;

  const header = useHeader({ setDepth, deleteDepth, setAxis, getAxis, getAxes, deleteAxis });
  const width = useMemo(() => getMaxWidth(store), [store]);

  return (
    <HeaderContext.Provider value={header}>
      <header className={styles.axes} style={{ minWidth: `${width}px` }}>
        <ul className={styles.list}>
          {Object.entries(store).map(([key, axes]) => (
            <li className={styles.item} key={key}>
              {axes.map((axis) => (
                <Axis {...axis} key={axis.name || axis.key} />
              ))}
            </li>
          ))}
          {depth && (
            <li className={styles.depth}>
              <DepthHeader {...depth} />
            </li>
          )}
        </ul>
      </header>
      {children}
    </HeaderContext.Provider>
  );
};
