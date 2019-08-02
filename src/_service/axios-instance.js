import axios from 'axios';
import {AppConfig} from '../application.config';

/**
 * Axios instance without JWT token authentication
 */
export const APIclient = axios.create({
    baseURL: `${AppConfig.serverUrl}/`
});

/**
 * Axios instance wit JWT token authentication
 */
export const APItokenclient = axios.create({
    baseURL: `${AppConfig.serverUrl}/api/`
});

/**
 * Axios interceptor allows you to add JWT token header to request
 */
APItokenclient.interceptors.request.use((request) => {
    const token = localStorage.getItem(AppConfig.JWTtokenname);

    if (token != null) {
        request.headers['x-access-token'] = token;
    }

    return request;
}, function (err) {
    return Promise.reject(err);
});