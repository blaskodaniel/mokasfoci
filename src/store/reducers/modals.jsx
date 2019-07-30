import * as actionTypes from '../actions/actionTypes';
const baseState = {
    value: false
};
export const Modals = (state = baseState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.BETTINGMODAL:
            newState.value = action.value;
            newState.match = action.match;
            return newState;
        default:
            return newState
    }
}