import {
    GET_ERRORS,
    SET_CURRENT_USER
} from './types';
import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post(`api/users/register`, userData).then(res => {
        history.push('/login')
    }).catch(error => {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    })
}

// Login - Get User Token
export const loginUser = (userCredentials) => dispatch => {
    axios
        .post(`/api/users/login`, userCredentials)
        .then(res => {
            // save to local storage
            const {
                token
            } = res.data;
            // set token to local storage - localstorage only stores strings tho u can convert it
            localStorage.setItem('jwtToken', token);
            // set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        })
};

// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}