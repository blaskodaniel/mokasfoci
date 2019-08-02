import {APItokenclient} from './axios-instance';

export const loadProfile = (userid) => {
    return APItokenclient.get(`getuserbyid/${userid}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const saveProfile = (user) => {
    return APItokenclient.patch(`profil/${user._id}`,user)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}