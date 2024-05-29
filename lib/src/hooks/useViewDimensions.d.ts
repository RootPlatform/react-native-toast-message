import { LayoutChangeEvent } from 'react-native';
export type UseViewDimensionsParams = {
    heightOffset?: number;
    widthOffset?: number;
};
/**
 * Retrieves View dimensions (height, width) from a LayoutChangeEvent and sets them on state
 */
export declare function useViewDimensions({ heightOffset, widthOffset }?: UseViewDimensionsParams): {
    computeViewDimensions: (event: LayoutChangeEvent) => void;
    height: number;
    width: number;
};
