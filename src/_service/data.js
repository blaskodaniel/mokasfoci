import axios from 'axios';
import {AppConfig} from '../application.config';
import {tokenHeader} from '../_helpers/token-header';

export const loadProfile = (userid) => {
    return axios.get(`${AppConfig.serverUrl}/api/getuserbyid/${userid}`,{ headers: tokenHeader() })
        .then(data => {
            if(data){
                return data;
            }
        });
}

export const saveProfile = (user) => {
    return axios.patch(`${AppConfig.serverUrl}/api/profil/${user._id}`,{ headers: tokenHeader() })
        .then(data => {
            if(data){
                return data;
            }
        });
}