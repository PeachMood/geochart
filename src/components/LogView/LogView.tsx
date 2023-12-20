import { useMemo } from 'react';
import { ParentSize } from '@visx/responsive';

import LogViewContext from 'context/LogViewContext';
import AxesContext from 'context/AxesContext';
import Header from 'components/Header';
import useStore from 'hooks/useStore';
import { useValue } from 'hooks/useValue';
import { defaultLogView } from 'utils/constants';
import { getDomain } from 'utils/utils';
import { type Axis, type Component, type DepthAxis, type LogView as LogViewProps } from 'utils/types';

import styles from './LogView.module.css';

const LogView: Component<LogViewProps> = ({ children, ...props }) => {
  const { value: depth, setValue: setDepthAxis, deleteValue: deleteDepthAxis } = useValue<DepthAxis>();
  const { store: axes, addItem: addAxis, deleteItem: deleteAxis } = useStore<Axis>('key');

  const logViewContext = useMemo(() => {
    const value = { ...defaultLogView, ...props };
    value.domain = { ...getDomain(value.depth), ...value.domain };
    return value;
  }, [props]);

  const axesContext = useMemo(() => ({ setDepthAxis, deleteDepthAxis, addAxis, deleteAxis }), [setDepthAxis, deleteDepthAxis, addAxis, deleteAxis]);

  return (
    <div className={styles.view}>
      <AxesContext.Provider value={axesContext}>
        <Header depth={depth} axes={axes} />
        <ParentSize className={styles.curves} debounceTime={10}>
          {(parent) => (
            <LogViewContext.Provider value={{ ...logViewContext, width: parent.width, height: parent.height }}>{children}</LogViewContext.Provider>
          )}
        </ParentSize>
      </AxesContext.Provider>
    </div>
  );
};

export default LogView;
