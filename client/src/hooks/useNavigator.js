import {useNavigate} from "react-router-dom";

const states = [false, false, false]
export default function useNavigator (activeIndex){
    const disableState = false;
    const activeState = true;

    const navigator = useNavigate();

    for (let i = 0; i < states.length; i++) {
        states[i] = disableState
    }

    states[activeIndex] = activeState;

    return {navigator, states};
}