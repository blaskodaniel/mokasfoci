import axios from 'axios';
import * as JWT from 'jwt-decode';
import {AppConfig} from '../../application.config';
import * as actionTypes from './actionTypes';
import { noAuthUser } from '../../context/AuthenticationContext';

export const Login = (username, password) => {
    return (dispatch, getState) => {
        axios.post(`${AppConfig.serverUrl}/login`,{email:username,password:password})
            .then(token => {
                if(token){
                    localStorage.setItem(AppConfig.JWTtokenname, token.data.token);
                    const decodedToken = JWT(token.data.token);
                    if(decodedToken){
                        dispatch(LoginSuccess(decodedToken));
                    }else{
                        noAuthUser.msg = "Sikertelen bejelentkezés!"
                        console.log("(errcode:4)")
                        dispatch(LoginError(noAuthUser));
                    }
                }else{
                    noAuthUser.msg = "Email cím vagy jelszó nem megfelelő!"
                    console.log("(errcode:1)")
                    dispatch(LoginError(noAuthUser));
                }
            }).catch(err => {
                if(err.response){
                    noAuthUser.msg = "Email cím vagy jelszó nem megfelelő!"
                    console.log("(errcode:2)")
                    dispatch(LoginError(noAuthUser));
                }else{
                    noAuthUser.msg = "Email cím vagy jelszó nem megfelelő!"
                    console.log("(errcode:3)")
                    dispatch(LoginError(noAuthUser));
                }
            });
    }
}

export const LoginSuccess = (payload) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        value: payload
    }
}

export const LoginError = (user) => {
    return {
        type: actionTypes.LOGIN_ERROR,
        value: user
    }
}

export const Registration = (email, password, name) => {
    return (dispatch, getState) => {
        axios.post(`${AppConfig.serverUrl}/register`,{email:email,password:password,name:name})
            .then(data => {
                dispatch({
                    type: actionTypes.REGISTER_SUCCESS,
                    value: data
                });
                // dispatch(Login(email,password));
            }).catch(err => {
                if(err.response){
                    dispatch(RegisterError(err.response.data));
                }else{
                    dispatch(RegisterError(err.message));
                }
            });
    }
}

export const RegisterError = (msg) => {
    return {
        type: actionTypes.REGISTER_ERROR,
        value: msg
    }
}