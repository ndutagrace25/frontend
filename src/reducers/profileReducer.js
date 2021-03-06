import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ALL_SKILLS
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    skills: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
            case GET_PROFILE:
                return {
                    ...state,
                    profile: action.payload,
                        loading: false
                }
                case CLEAR_CURRENT_PROFILE:
                    return {
                        ...state,
                        profile: null
                    }
                    case GET_ALL_SKILLS:
                        return {
                            ...state,
                            skills: action.payload
                        }
                        default:
                            return state;
    }
}