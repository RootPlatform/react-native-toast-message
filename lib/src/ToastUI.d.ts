import React from 'react';
import { ToastConfig, ToastData, ToastHideParams, ToastOptions, ToastShowParams, ToastUnmountParams } from './types';
export type ToastUIProps = {
    isVisible: boolean | undefined;
    options: Required<ToastOptions>;
    data: ToastData;
    show: (params: ToastShowParams) => void;
    hide: (params?: ToastHideParams) => void;
    unmount: (params: ToastUnmountParams) => void;
    config?: ToastConfig;
};
export declare function ToastUI(props: ToastUIProps): React.JSX.Element;
