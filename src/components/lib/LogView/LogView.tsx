import { type LogViewProps, type Component } from 'types';
import { Header } from 'components/ui';
import LogViewContext from 'context/LogViewContext';
import useLogView from 'hooks/context/useLogView';
import useParentSize from 'hooks/utils/useParentSize';
import useDomain from 'hooks/utils/useDomain';
import useDepth from 'hooks/utils/useDepth';

import { DEFAULT_ORIENTATION, DEFAULT_SCOPE, DEFAULT_UNITS, DEFAULT_VERTICAL_GRID } from './constants';
import styles from './LogView.module.css';

const LogView: Component<Partial<LogViewProps>> = ({ children, ...props }) => {
  const { orientation = DEFAULT_ORIENTATION, units = DEFAULT_UNITS } = props;
  const { scope = DEFAULT_SCOPE, grid = DEFAULT_VERTICAL_GRID } = props;

  const parent = useParentSize<HTMLDivElement>();

  const domain = useDomain(props.domain, props.depth);
  const depth = useDepth(props.depth);

  const { width, height } = parent.size;
  const logView = useLogView({ orientation, scope, units, domain, grid, depth, width, height });

  return (
    <div className={styles.view}>
      <Header>
        <div className={styles.curves} ref={parent.ref}>
          <LogViewContext.Provider value={logView}>{children}</LogViewContext.Provider>
        </div>
      </Header>
    </div>
  );
};

export default LogView;
