import { ToastData, ToastHideParams, ToastOptions, ToastProps, ToastShowParams } from './types';
export declare const DEFAULT_DATA: ToastData;
export declare const DEFAULT_OPTIONS: ToastOptions;
export type UseToastParams = {
    defaultOptions: Omit<ToastProps, 'config'>;
};
export declare function useToast({ defaultOptions }: UseToastParams): {
    isVisible: boolean | undefined;
    data: ToastData;
    options: Required<ToastOptions>;
    show: (params: ToastShowParams) => void;
    hide: (params?: ToastHideParams) => void;
    unmount: () => void;
};
