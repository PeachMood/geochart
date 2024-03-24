import { useContext } from 'react';

import { type Component, type CurveTrackProps } from 'types';
import { HorizontalGrid, VerticalGrid } from 'components/ui';
import LogViewContext from 'context/LogViewContext';
import CurveTrackContext from 'context/CurveTrackContext';
import useCurveTrack from 'hooks/context/useCurveTrack';
import useKey from 'hooks/utils/useKey';
import useScope from 'hooks/utils/useScope';

import { DEFAULT_HEIGHT, DEFAULT_SCALE, DEFAULT_HORIZONTAL_GRID } from './constants';
import styles from './CurveTrack.module.css';

const CurveTrack: Component<Partial<CurveTrackProps>> = ({ children, ...props }) => {
  const { height = DEFAULT_HEIGHT, scale = DEFAULT_SCALE, grid = DEFAULT_HORIZONTAL_GRID } = props;

  const logView = useContext(LogViewContext);
  const width = useScope(logView.domain, logView.scope);
  const key = useKey();

  const size = { width, height };
  const main = { style: logView.grid.main?.style, ...grid.main };
  const secondary = { style: logView.grid.secondary?.style, ...grid.secondary };

  const curveTrack = useCurveTrack({ key, scale, ...size, ...main });

  return (
    <CurveTrackContext.Provider value={curveTrack}>
      <div className={styles.track}>
        <HorizontalGrid track={key} main={main} secondary={secondary} size={size} scale={scale}>
          <VerticalGrid main={logView.grid.main} secondary={logView.grid.secondary} domain={logView.domain} size={size}>
            {children}
          </VerticalGrid>
        </HorizontalGrid>
      </div>
    </CurveTrackContext.Provider>
  );
};

export default CurveTrack;
