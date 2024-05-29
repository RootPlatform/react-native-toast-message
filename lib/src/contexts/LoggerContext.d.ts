import React from 'react';
import { ReactChildren } from '../types';
export type LoggerContextType = {
    log: (...args: unknown[]) => void;
};
export type LoggerProviderProps = {
    children: ReactChildren;
    enableLogs?: boolean;
};
declare function LoggerProvider({ children, enableLogs }: LoggerProviderProps): React.JSX.Element;
declare function useLogger(): LoggerContextType;
export { LoggerProvider, useLogger };
