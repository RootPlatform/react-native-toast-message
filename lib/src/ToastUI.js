import React from 'react';
import { AnimatedContainer } from './components/AnimatedContainer';
import { ErrorToast } from './components/ErrorToast';
import { InfoToast } from './components/InfoToast';
import { SuccessToast } from './components/SuccessToast';
const defaultToastConfig = {
    success: (props) => <SuccessToast {...props}/>,
    error: (props) => <ErrorToast {...props}/>,
    info: (props) => <InfoToast {...props}/>
};
function renderComponent({ data, options, config, isVisible, show, hide, unmount }) {
    const { type } = options;
    const toastConfig = {
        ...defaultToastConfig,
        ...config
    };
    const ToastComponent = toastConfig[type];
    if (!ToastComponent) {
        throw new Error(`Toast type: '${type}' does not exist. You can add it via the 'config' prop on the Toast instance. Learn more: https://github.com/calintamas/react-native-toast-message/blob/master/README.md`);
    }
    return <ToastComponent {...options} {...data} isVisible={isVisible} show={show} hide={hide} unmount={unmount}/>;
}
export function ToastUI(props) {
    const { isVisible, options, hide } = props;
    const { position, topOffset, bottomOffset, keyboardOffset, swipeable, translateYFactor, animationProps, onHidden } = options;
    return (<AnimatedContainer isVisible={isVisible} position={position} topOffset={topOffset} bottomOffset={bottomOffset} keyboardOffset={keyboardOffset} swipeable={swipeable} translateYFactor={translateYFactor} animationProps={animationProps} onHide={hide} onHidden={onHidden}>
      {renderComponent(props)}
    </AnimatedContainer>);
}
