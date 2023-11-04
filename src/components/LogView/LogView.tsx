import { FC, useState } from 'react';
import { ComposedChart, ResponsiveContainer } from 'recharts';

import LogViewContext from '../../context/LogViewContext';
import ILogView from '../../types/ILogView';
import { defaultGrid } from '../../utils/constants';

import styles from './LogView.module.css';

export interface LogViewProps extends ILogView, Stylable {}

const LogView: FC<LogViewProps> = ({ className, ...props }) => {
  const { name = 'Планшет', orientation = 'vertical', scope = 100, units = 'm', grid = defaultGrid, range } = props;
  const [logView, setLogView] = useState(props);

  return (
    <LogViewContext.Provider value={{ logView }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart></ComposedChart>
      </ResponsiveContainer>
    </LogViewContext.Provider>
  );
};

export default LogView;
