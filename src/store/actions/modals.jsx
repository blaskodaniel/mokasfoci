import * as actionTypes from './actionTypes';

export const BettingModalAction = (value, match) => {
    return {
        type: actionTypes.BETTINGMODAL,
        value,
        match
    }
}