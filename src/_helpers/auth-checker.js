import * as JWT from 'jwt-decode';

export default function authChecker() {
    // return authorization header with jwt token
    let user = localStorage.getItem('user');

    if (user) {
        const decodedToken = JWT(user);
        return decodedToken;
    } else {
        return false;
    }
}