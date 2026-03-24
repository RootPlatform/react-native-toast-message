import React from 'react';
import { Animated, Platform } from 'react-native';

import { SpringAnimationProps, ToastPosition } from '../types';
import { additiveInverseArray } from '../utils/array';
import { useKeyboard } from './useKeyboard';
import { useLogger } from '../contexts';

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
  const { log } = useLogger();

  const animate = React.useCallback(
    ({ toValue, onHidden }: { toValue: number; onHidden: () => void }) =>
      new Promise(() => {
        Animated.spring(animatedValue.current, {
          ...animationProps,
          toValue,
          useNativeDriver,
          friction: animationProps?.friction ? animationProps.friction : 8,
        }).start(({ finished }) => {
          if (finished) {
            if (toValue === 0 || toValue === 2) {
              // Animated off-screen (0 = toward origin, 2 = away from origin) - run onHidden
              onHidden();
            }
          } else {
            log('Animation was interrupted');
          }
        });
      }),
    [animationProps]
  );

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
    inputRange: [0, 0.7, 1, 1.3, 2],
    outputRange: [0, 1, 1, 1, 0],
    extrapolate: 'clamp'
  });

  const scale = animatedValue.current.interpolate({
    inputRange: [0, 0.7, 1, 1.3, 2],
    outputRange: [0.8, 1, 1, 1, 0.8],
    extrapolate: 'clamp'
  });

  return {
    animatedValue,
    animate,
    animationStyles: {
      opacity,
      transform: [
        {
          translateY
        },
        {
          scale
        }
      ]
    }
  };
}
