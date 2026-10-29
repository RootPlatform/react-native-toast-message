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
    const { isVisible, options, hide, config } = props;
    const { position, topOffset, bottomOffset, keyboardOffset, swipeable, translateYFactor, animationProps, onHidden } = options;
    const entry = config?.[options.type];
    const fade = entry?.fade !== false;
    const slide = entry?.slide !== false;
    const hideDelay = entry?.hideDelay;
    return (<AnimatedContainer 
    // Keyed so a non-fading toast never reuses a native view a fading toast took to alpha 0
    key={`${fade ? 'fade' : 'solid'}-${slide ? 'slide' : 'still'}`} isVisible={isVisible} position={position} topOffset={topOffset} bottomOffset={bottomOffset} keyboardOffset={keyboardOffset} swipeable={swipeable} translateYFactor={translateYFactor} animationProps={animationProps} fade={fade} slide={slide} hideDelay={hideDelay} onHide={hide} onHidden={onHidden}>
      {renderComponent(props)}
    </AnimatedContainer>);
}
