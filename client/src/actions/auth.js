import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // log in user
        const { data } = await api.signIn(formData); 
        dispatch({type: 'AUTH', data});
        navigate("/");
    } catch (error) {
        console.log(error); 
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {    
        // sign up user
        console.log("action/auth.js signup");
        console.log(formData);
        const { data } = await api.signUp(formData); 
        dispatch({type: 'AUTH', data});
        navigate("/");
    } catch (error) {
        console.log(error); 
    }
};