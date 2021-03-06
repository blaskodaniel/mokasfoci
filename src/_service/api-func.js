import { APItokenclient } from './axios-instance';

export const loadProfile = () => {
    return APItokenclient.get(`getuserbyid`)
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

export const getuserinfo = (playerid) => {
    return APItokenclient.get(`getuserinfo/${playerid}`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const gettabelladata = () => {
    return APItokenclient.get(`gettabelladata`)
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

export const settabella = (data) => {
    return APItokenclient.post(`settabelladata`,{data:data})
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

export const news = () => {
    return APItokenclient.get(`news`)
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

export const userstatbyuserid = (playerid) => {
    return APItokenclient.post(`userstatbyid`, {playerid: playerid})
        .then(data => {
            return data;
        }).catch(function (error) {
            // handle error
            return error
        });
}

