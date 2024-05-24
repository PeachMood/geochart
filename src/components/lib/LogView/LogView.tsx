import { type Component, type Orientation, type Units, type Domain, type Depth, type VerticalGrid } from 'types';
import Header from 'components/ui/Header';
import LogViewContext from 'context/LogViewContext';
import useLogView from 'hooks/useLogView';
import useParentSize from 'hooks/useParentSize';
import useDomain from 'hooks/useDomain';
import useDepth from 'hooks/useDepth';

import { DEFAULT_ORIENTATION, DEFAULT_SCOPE, DEFAULT_UNITS, DEFAULT_VERTICAL_GRID } from './constants';
import styles from './LogView.module.css';

export interface LogViewProps {
  name: string;
  scope: number;
  orientation: Orientation;
  units: Units;
  domain: Domain;
  depth: Depth;
  grid: VerticalGrid;
}

export const LogView: Component<Partial<LogViewProps>> = ({ children, ...props }) => {
  const { orientation = DEFAULT_ORIENTATION, units = DEFAULT_UNITS } = props;
  const { scope = DEFAULT_SCOPE, grid = DEFAULT_VERTICAL_GRID } = props;

  const parent = useParentSize<HTMLDivElement>();

  const domain = useDomain(props.domain, props.depth);
  const depth = useDepth(props.depth);

  const { width, height } = parent.size;
  const logView = useLogView({ orientation, scope, units, domain, grid, depth, width, height });

  return (
    <div className={styles.container}>
      <div className={styles.view}>
        <Header>
          <div className={styles.curves} ref={parent.ref}>
            <LogViewContext.Provider value={logView}>{children}</LogViewContext.Provider>
          </div>
        </Header>
      </div>
    </div>
  );
};
