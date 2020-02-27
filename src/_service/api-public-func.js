import {APIclient} from './axios-instance';
import moment from 'moment';
import { AppConfig } from '../application.config';

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

export const getMatchesByDay = (day = moment().format("YYYY-MM-DD"), to = 1) => {
    return APIclient.post(`getmatchesbyday`,{"day":day, "to": to})
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

export const getmatchesbygroup = (groupid) => {
    return APIclient.get(`getmatchesbygroup/${groupid}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getMatchesFromTo = (from = moment().format("YYYY-MM-DD"), to) => {
    return APIclient.post(`getmatchesfromto`,{"from":from, "to": to})
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

export const getAvatars = () => {
    return APIclient.get(`getavatars`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getsettings = () => {
    return APIclient.get(`downloadSetting`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}