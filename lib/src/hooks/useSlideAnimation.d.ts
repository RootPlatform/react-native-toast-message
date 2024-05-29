import React from 'react';
import { Animated } from 'react-native';
import { SpringAnimationProps, ToastPosition } from '../types';
type UseSlideAnimationParams = {
    position: ToastPosition;
    height: number;
    topOffset: number;
    bottomOffset: number;
    keyboardOffset: number;
    animationProps?: SpringAnimationProps;
};
export declare function translateYOutputRangeFor({ position, height, topOffset, bottomOffset, keyboardHeight, keyboardOffset }: UseSlideAnimationParams & {
    keyboardHeight: number;
}): number[];
export declare function useSlideAnimation({ position, height, topOffset, bottomOffset, keyboardOffset, animationProps }: UseSlideAnimationParams): {
    animatedValue: React.MutableRefObject<Animated.Value>;
    animate: ({ toValue, onHidden }: {
        toValue: number;
        onHidden: () => void;
    }) => Promise<unknown>;
    animationStyles: {
        opacity: Animated.AnimatedInterpolation;
        transform: {
            translateY: Animated.AnimatedInterpolation;
        }[];
    };
};
export {};
