import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ReactChildren } from '../types';
type TouchableProps = {
    children: ReactChildren;
} & TouchableOpacityProps;
export declare function Touchable({ children, activeOpacity, ...rest }: TouchableProps): React.JSX.Element;
export {};
