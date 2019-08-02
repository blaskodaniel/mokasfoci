import {AppConfig} from '../application.config';
export function tokenHeader() {
    // return JWT token header
    let user = localStorage.getItem(AppConfig.JWTtokenname);

    if (user) {
        return { 'x-access-token': user };
    } else {
        return {};
    }
}