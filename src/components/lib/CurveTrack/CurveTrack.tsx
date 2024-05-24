import { useContext } from 'react';

import { type Component, type HorizontalGrid as Grid, type Scale } from 'types';
import HorizontalGrid from 'components/ui/HorizontalGrid';
import VerticalGrid from 'components/ui/VerticalGrid';
import LogViewContext from 'context/LogViewContext';
import CurveTrackContext from 'context/CurveTrackContext';
import useCurveTrack from 'hooks/useCurveTrack';
import useKey from 'hooks/useKey';
import useScope from 'hooks/useScope';

import { DEFAULT_HEIGHT, DEFAULT_SCALE, DEFAULT_HORIZONTAL_GRID } from './constants';
import styles from './CurveTrack.module.css';

export interface CurveTrackProps {
  name: string;
  height: number;
  scale: Scale;
  grid: Grid;
}

export const CurveTrack: Component<Partial<CurveTrackProps>> = ({ children, ...props }) => {
  const { height = DEFAULT_HEIGHT, scale = DEFAULT_SCALE, grid = DEFAULT_HORIZONTAL_GRID } = props;

  const logView = useContext(LogViewContext);
  const width = useScope(logView.domain, logView.scope);
  const key = useKey();

  const position = 'bottom';
  const size = { width, height };
  const main = { style: logView.grid.main?.style, ...grid.main };
  const secondary = { style: logView.grid.secondary?.style, ...grid.secondary };

  const curveTrack = useCurveTrack({ key, scale, position, ...size, ...main });

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
