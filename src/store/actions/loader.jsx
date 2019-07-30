import * as actionTypes from './actionTypes';

export const Loader = (value) => {
    return {
        type: actionTypes.LOADER,
        value
    }
}