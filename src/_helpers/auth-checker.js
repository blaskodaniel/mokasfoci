import * as JWT from 'jwt-decode';
import {AppConfig} from '../application.config';

export default function authChecker() {
    // return authorization header with jwt token
    let user = localStorage.getItem(AppConfig.JWTtokenname);

    if (user) {
        const decodedToken = JWT(user);
        return decodedToken;
    } else {
        return false;
    }
}