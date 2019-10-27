import { APItokenclient } from './axios-instance';

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
    return APItokenclient.patch(`profil/${user._id}`, user)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const createCoupon = (coupon) => {
    return APItokenclient.post(`newcoupon`, coupon)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const deleteCoupon = (coupon) => {
    return APItokenclient.delete(`coupon/${coupon._id}`)
        .then(data => {
            if (data.toLowerCase() === "success") {
                return true;
            } else {
                return false;
            }
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const modifyCoupon = (couponid, newcoupon) => {
    return APItokenclient.patch(`coupon/${couponid}`, newcoupon)
        .then(data => {
            if (data.status) {
                return {status: true, data: data};
            } else {
                return {status: false, data: null};
            }
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const getCouponsByUserId = (userid) => {
    return APItokenclient.get(`coupons/all/${userid}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const userbets = (matchid) => {
    return APItokenclient.get(`userbets/${matchid}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const sendissue = (userid,msg) => {
    return APItokenclient.post(`sendissue`,{userid: userid, msg: msg})
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const setavatar = (avatarname) => {
    return APItokenclient.patch(`setavatar`,{avatar: avatarname})
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const loadTransactions = (userid) => {
    return APItokenclient.post(`loadtransactions`,{userid: userid})
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const userstat = () => {
    return APItokenclient.post(`userstat`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

