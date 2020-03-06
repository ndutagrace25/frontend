import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    GET_ALL_SKILLS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get(`/api/profile`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(error => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

// create profile
export const createProfile = (profileData, history) => dispatch => {
    let url = `/api/profile`;

    axios
        .post(url, profileData)
        .then(res => {
            history.push("/dashboard")
        })
        .catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        })

}

// get all skills
export const getAllSkills = () => dispatch => {
    let url = `/api/profile/skills`;
    axios
        .get(url)
        .then(res => {
            dispatch({
                type: GET_ALL_SKILLS,
                payload: res.data
            })
        })
        .catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        })
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    }
}