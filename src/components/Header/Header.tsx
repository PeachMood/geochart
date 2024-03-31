import { useMemo } from 'react';

import { type Component } from 'types';
import Axis, { AxisProps } from 'components/Axis';
import DepthHeader, { DepthHeaderProps } from 'components/DepthHeader';
import HeaderContext from 'context/HeaderContext';
import useHeader from 'hooks/useHeader';
import useStore from 'hooks/useStore';
import useValue from 'hooks/useValue';

import { DEFAULT_AXIS_WIDTH } from './constants';
import styles from './Header.module.css';

export type HeaderProps = object;
// TODO: Rewrite this messy component
export const Header: Component<HeaderProps> = ({ children }) => {
  const axes = useStore<AxisProps>('name');
  const { store, setItem: setCurveAxis, getItem: getCurveAxis, deleteItem: deleteCurveAxis } = axes;
  const { value: depth, setValue: setDepth, deleteValue: deleteDepth } = useValue<DepthHeaderProps>();
  const header = useHeader({ setDepth, deleteDepth, getCurveAxis, setCurveAxis, deleteCurveAxis });

  const width = useMemo(() => {
    const values = Object.values(store);
    return Math.max(...values.map((array) => array.length)) * DEFAULT_AXIS_WIDTH;
  }, [store]);

  return (
    <HeaderContext.Provider value={header}>
      <header className={styles.axes} style={{ minWidth: width + 'px' }}>
        <ul className={styles.list}>
          {Object.entries(store).map(([key, axes]) =>
            axes.length === 0 ? null : (
              <li className={styles.item} key={key}>
                {axes.map((axis) => (
                  <Axis {...axis} key={axis.name} />
                ))}
              </li>
            ),
          )}
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
