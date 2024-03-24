import { useMemo } from 'react';

import { type Component, type AxisProps, type DepthHeaderProps as Depth } from 'types';
import HeaderContext from 'context/HeaderContext';
import Axis from 'components/ui/Axis';
import DepthHeader from 'components/ui/DepthHeader';
import useHeader from 'hooks/context/useHeader';
import useStore from 'hooks/store/useStore';
import useValue from 'hooks/store/useValue';

import { DEFAULT_AXIS_WIDTH } from './constants';
import styles from './Header.module.css';

export type HeaderProps = object;

const Header: Component<HeaderProps> = ({ children }) => {
  const axes = useStore<AxisProps>('name');
  const { store, setItem: setCurveAxis, getItem: getCurveAxis, deleteItem: deleteCurveAxis } = axes;
  const { value: depth, setValue: setDepth, deleteValue: deleteDepth } = useValue<Depth>();
  const header = useHeader({ setDepth, deleteDepth, getCurveAxis, setCurveAxis, deleteCurveAxis });

  const width = useMemo(() => {
    const values = Object.values(store);
    return Math.max(...values.map((array) => array.length)) * DEFAULT_AXIS_WIDTH;
  }, [store]);

  return (
    <HeaderContext.Provider value={header}>
      <header className={styles.axes} style={{ minWidth: width + 'px' }}>
        <ul className={styles.list}>
          {Object.entries(store).map(
            ([key, axes]) =>
              axes && (
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

export default Header;
