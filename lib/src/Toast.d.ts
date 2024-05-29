import React from 'react';
import { ToastProps, ToastShowParams } from './types';
export declare function Toast(props: ToastProps): React.JSX.Element;
export declare namespace Toast {
    var show: (params: ToastShowParams) => void;
    var hide: (params?: import("./types").ToastHideOptions | undefined) => void;
    var unmount: (params?: void | undefined) => void;
}
