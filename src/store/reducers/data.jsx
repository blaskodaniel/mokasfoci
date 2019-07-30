const baseState = {
    data: [],
    msg: ""
};
export const GetMatches = (state = baseState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'GETMATCHES_SUCCESS':
            newState.data = action.value.data;
            return newState;
        case 'GETMATCHES_ERROR':
            newState.msg = action.value.msg;
            return newState;
        default:
            return newState
    }
}