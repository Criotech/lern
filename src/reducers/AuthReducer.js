import { EMAIL_CHANGED, PASSWORD_CHANGED, FULL_NAME_CHANGED, SET_CURRENT_USER, AUTH_ERROR, FORM_TYPE, SIGN_UP, IS_LOADING } from '../actions/types';
import _  from 'lodash'

const INITIAL_STATE = { email: '', password: '', fullName: '', isAuthenticated: false, user: {}, message: '', status: false, teacherType: true, loading: false };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case IS_LOADING:
            return {...state, loading: true}
        case FORM_TYPE: 
            return { ...state, teacherType: action.payload } 
        case EMAIL_CHANGED:
            return { ...state, message: '', email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, message: '', password: action.payload }
        case SIGN_UP: 
        return { ...state, loading: false, message: "Account created successfully" }
       case FULL_NAME_CHANGED:
            return { ...state, message: '', fullName: action.payload }
        case SET_CURRENT_USER: 
            return { ...state, isAuthenticated: !_.isEmpty(action.user), user: action.user, loading: false }
        case AUTH_ERROR:
            return { ...state, ...INITIAL_STATE, message: action.payload.message }
        default:
            return state
    }
}
