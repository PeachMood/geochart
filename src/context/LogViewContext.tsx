import { createContext } from 'react';

import { type LogView } from 'utils/types';

export type LogViewContext = LogView;

const LogViewContext = createContext<LogViewContext>({} as LogViewContext);

export default LogViewContext;
