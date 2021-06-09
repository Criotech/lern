import axios from 'axios';
import jwt from 'jsonwebtoken';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FULL_NAME_CHANGED,
  SIGN_UP,
  SET_CURRENT_USER,
  AUTH_ERROR,
  FORM_TYPE,
  RESET_STORE,
  IS_LOADING,
} from './types';

export const formType = text => {
  console.log (text);
  return {
    type: FORM_TYPE,
    payload: text,
  };
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const fullNameChanged = text => {
  return {
    type: FULL_NAME_CHANGED,
    payload: text,
  };
};

export const signup = ({email, password, role, fullName}) => {
  console.log ('you called me');
  return dispatch => {
    dispatch ({type: IS_LOADING});
    axios
      .post ('https://learnacademyapi.herokuapp.com/users/signup', {
        email,
        password,
        role,
        fullName,
      })
      .then (user => {
        console.log (user);
        dispatch ({type: SIGN_UP});
        dispatch (errorMessage ({message: 'Account created successfully'}));
      })
      .catch (error => {
        console.log (error);
        if (error.message === 'Network Error') {
          dispatch (errorMessage ({message: 'connect to internet'}));
        } else if (error.response.data.message) {
          dispatch (errorMessage ({message: error.response.data.message}));
        }
      });
  };
};

export const login = ({email, password}) => {
  return dispatch => {
    dispatch ({type: IS_LOADING});
    axios
      .post ('https://learnacademyapi.herokuapp.com/users/login', {
        email,
        password,
      })
      .then (res => {
        const token = res.data.token;
        localStorage.setItem ('jwtToken', token);
        setAuthorizationToken (token);
        dispatch (setCurrentUser (jwt.decode (token)));
      })
      .catch (error => {
        console.log (error.response);
        if (error.message === 'Network Error') {
          dispatch (errorMessage ({message: 'connect to internet'}));
        } else if (error.response.data.message) {
          dispatch (errorMessage ({message: error.response.data.message}));
        }
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem ('jwtToken');
    setAuthorizationToken (false);
    dispatch (setCurrentUser ({}));
    dispatch (reset ());
  };
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

export const reset = () => {
  return {
    type: RESET_STORE,
  };
};

export const errorMessage = data => {
  return {
    type: AUTH_ERROR,
    payload: data,
  };
};
