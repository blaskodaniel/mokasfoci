export function tokenHeader() {
    // return JWT token header
    let user = localStorage.getItem('user');

    if (user) {
        return { 'x-access-token': user };
    } else {
        return {};
    }
}