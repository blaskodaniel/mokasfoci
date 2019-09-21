import {APIclient} from './axios-instance';
import moment from 'moment';

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

export const getMatches = (query = "") => {
    return APIclient.get(`getmatches${query}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getMatchesByDay = (day = moment().format("YYYY-MM-DD")) => {
    return APIclient.post(`getmatchesbyday`,{"day":day})
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getMatchesFromDay = (day = moment().format("YYYY-MM-DD")) => {
    return APIclient.post(`getmatchesfromday`,{"day":day})
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getMatchesToDay = (day = moment().format("YYYY-MM-DD")) => {
    return APIclient.post(`getmatchestoday`,{"day":day})
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getPlayers = () => {
    return APIclient.get(`getplayers`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}