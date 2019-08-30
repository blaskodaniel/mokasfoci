import {APItokenclient} from './axios-instance';

export const loadAllUser = () => {
    return APItokenclient.get(`alluser`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}