import React from 'react';

import { useLogger } from './contexts';
import { useTimeout } from './hooks';
import { ToastData, ToastHideParams, ToastOptions, ToastProps, ToastShowParams } from './types';
import { noop } from './utils/func';
import { mergeIfDefined } from './utils/obj';

export const DEFAULT_DATA: ToastData = {
  text1: undefined,
  text2: undefined
};

export const DEFAULT_OPTIONS: ToastOptions = {
  type: 'success',
  text1Style: null,
  text2Style: null,
  position: 'top',
  autoHide: true,
  swipeable: true,
  visibilityTime: 4000,
  topOffset: 40,
  bottomOffset: 40,
  keyboardOffset: 10,
  onShow: noop,
  onHide: noop,
  onHidden: noop,
  onPress: noop,
  props: {}
};

export type UseToastParams = {
  defaultOptions: Omit<ToastProps, 'config'>;
};

const hideParams = ['onHidden']; // Add params to this array if new ones are created
export function useToast({ defaultOptions }: UseToastParams) {
  const { log } = useLogger();

  const [isVisible, setIsVisible] = React.useState<undefined | boolean>(undefined);
  const [data, setData] = React.useState<ToastData>(DEFAULT_DATA);

  const initialOptions = mergeIfDefined(
    DEFAULT_OPTIONS,
    defaultOptions
  ) as Required<ToastOptions>;
  const [options, setOptions] =
    React.useState<Required<ToastOptions>>(initialOptions);

  const onAutoHide = React.useCallback(() => {
    log('Auto hiding');
    setIsVisible(false);
    options.onHide();
  }, [log, options]);
  const { startTimer, clearTimer } = useTimeout(
    onAutoHide,
    options.visibilityTime
  );
  
  const hide = React.useCallback(
    (params?: ToastHideParams) => {
      const validHideParams = params && hideParams.some(param => Object.keys(params).includes(param));
      if (validHideParams) {
        log("Hiding with params", params); // For some reason JSON.stringify returns an empty object
        const { onHidden } = params;
        options.onHidden = onHidden || initialOptions.onHidden; // For now, we only pass onHidden as a callback, later if we start passing multiple params, we can make this prettier.
      } else {
        log("Hiding without params");
      }
      setIsVisible(false);
      clearTimer();
      options.onHide();
    },
    [clearTimer, initialOptions.onHidden, log, options]
  );

  const unmount = React.useCallback(() => {
    log('Unmounting');
    setOptions(initialOptions)
  }, [initialOptions, log]);

  const show = React.useCallback(
    (params: ToastShowParams) => {
      log(`Showing with params: ${JSON.stringify(params)}`);
      const {
        text1 = DEFAULT_DATA.text1,
        text2 = DEFAULT_DATA.text2,
        type = initialOptions.type,
        text1Style = initialOptions.text1Style,
        text2Style = initialOptions.text2Style,
        position = initialOptions.position,
        autoHide = initialOptions.autoHide,
        visibilityTime = initialOptions.visibilityTime,
        topOffset = initialOptions.topOffset,
        bottomOffset = initialOptions.bottomOffset,
        keyboardOffset = initialOptions.keyboardOffset,
        onShow = initialOptions.onShow,
        onHide = initialOptions.onHide,
        onHidden = initialOptions.onHidden,
        onPress = initialOptions.onPress,
        swipeable = initialOptions.swipeable,
        translateYFactor = initialOptions.translateYFactor,
        animationProps = initialOptions.animationProps,
        props = initialOptions.props
      } = params;
      setData({
        text1,
        text2
      });
      setOptions(
        mergeIfDefined(initialOptions, {
          type,
          text1Style,
          text2Style,
          position,
          autoHide,
          visibilityTime,
          topOffset,
          bottomOffset,
          keyboardOffset,
          onShow,
          onHide,
          onHidden,
          onPress,
          swipeable,
          translateYFactor,
          animationProps,
          props
        }) as Required<ToastOptions>
      );
      // TODO: validate input
      // TODO: use a queue when Toast is already visible
      setIsVisible(true); // Sets isVisible to true which is returned below and displays the modal
      onShow();
    },
    [initialOptions, log]
  );

  React.useEffect(() => {
    const { autoHide } = options;
    if (isVisible) {
      if (autoHide) {
        startTimer();
      } else {
        clearTimer();
      }
    }
  }, [isVisible, options, startTimer, clearTimer]);

  return {
    isVisible,
    data,
    options,
    show,
    hide,
    unmount
  };
}
