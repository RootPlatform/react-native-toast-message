import React from 'react';
import { Animated, Platform } from 'react-native';

import { SpringAnimationProps, ToastPosition } from '../types';
import { additiveInverseArray } from '../utils/array';
import { useKeyboard } from './useKeyboard';

type UseSlideAnimationParams = {
  position: ToastPosition;
  height: number;
  topOffset: number;
  bottomOffset: number;
  keyboardOffset: number;
  animationProps?: SpringAnimationProps
};

export function translateYOutputRangeFor({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardHeight,
  keyboardOffset
}: UseSlideAnimationParams & {
  keyboardHeight: number;
}) {
  const offset = position === 'bottom' ? bottomOffset : topOffset;
  const keyboardAwareOffset =
    position === 'bottom' ? keyboardHeight + keyboardOffset : 0;

  const range = [-(height * 2), Math.max(offset, keyboardAwareOffset)];
  const outputRange =
    position === 'bottom' ? additiveInverseArray(range) : range;

  return outputRange;
}

const useNativeDriver = Platform.select({ native: true, default: false });

export function useSlideAnimation({
  position,
  height,
  topOffset,
  bottomOffset,
  keyboardOffset,
  animationProps
}: UseSlideAnimationParams) {
  const animatedValue = React.useRef(new Animated.Value(0));
  const { keyboardHeight } = useKeyboard();

  const animate = React.useCallback(({ toValue, onHidden}: { toValue: number; onHidden: () => void }) => 
  new Promise((resolve, reject) => {
    Animated.spring(animatedValue.current, {
      ...animationProps,
      toValue,
      useNativeDriver,
      friction: animationProps?.friction ? animationProps.friction : 8
    }).start(({ finished }) => {
      if (finished) {
        resolve(true); // Resolve the promise when the animation finishes
        if (toValue === 0) {
          // Animated to value 0 - run onHidden
          onHidden();
        }
      } else {
        reject(new Error('Animation was interrupted')); // Reject if the animation was interrupted
      }
    });
  }), [animationProps]);

  const translateY = React.useMemo(() => animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: translateYOutputRangeFor({
      position,
      height,
      topOffset,
      bottomOffset,
      keyboardHeight,
      keyboardOffset
    })
  }), [position, height, topOffset, bottomOffset, keyboardHeight, keyboardOffset]);

  const opacity = animatedValue.current.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 1, 1]
  });

  return {
    animatedValue,
    animate,
    animationStyles: {
      opacity,
      transform: [
        {
          translateY
        }
      ]
    }
  };
}
