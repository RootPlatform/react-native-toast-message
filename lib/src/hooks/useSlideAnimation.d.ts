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
    fade?: boolean;
    slide?: boolean;
};
export declare function translateYOutputRangeFor({ position, height, topOffset, bottomOffset, keyboardHeight, keyboardOffset }: UseSlideAnimationParams & {
    keyboardHeight: number;
}): number[];
export declare function useSlideAnimation({ position, height, topOffset, bottomOffset, keyboardOffset, animationProps, fade, slide }: UseSlideAnimationParams): {
    animatedValue: React.MutableRefObject<Animated.Value>;
    animate: ({ toValue, onHidden }: {
        toValue: number;
        onHidden: () => void;
    }) => Promise<unknown>;
    animationStyles: {
        opacity: number | Animated.AnimatedInterpolation;
        transform: ({
            translateY: Animated.AnimatedInterpolation;
            scale?: undefined;
        } | {
            scale: Animated.AnimatedInterpolation;
            translateY?: undefined;
        })[] | undefined;
    };
};
export {};
