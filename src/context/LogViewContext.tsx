import { createContext } from 'react';

import ILogView from '../types/ILogView';

export interface ILogViewContext {
  logView: ILogView | undefined;
}

const LogViewContext = createContext<ILogViewContext | null>(null);

export default LogViewContext;
