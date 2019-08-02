import {APIclient} from './axios-instance';

export const getTeams = (query = "") => {
    return APIclient.get(`getteam${query}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getGroups = (query = "") => {
    return APIclient.get(`getgroup${query}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}