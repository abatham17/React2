import * as actionTypes from './actionTypes'
import * as API from 'Front/api/login'


//-- Login
export const loginUserRequest = () => ({
    type: actionTypes.GET_SIGNIN_USER_REQUEST
})
export const loginUserSuccess = (response) => ({
    type: actionTypes.GET_SIGNIN_USER_SUCCESS,
    payload: {
        response,
    }
})
export const loginUserError = (error) => ({
    type: actionTypes.GET_SIGNIN_USER_ERROR,
    payload: {
        error
    }
})
export const loginAction = (data) => {    
    return dispatch => {
        dispatch(loginUserRequest())
        const FormData = {
            username:data.formData.username,
            password:data.formData.password
        }
        return API.signInUser(FormData)
        .then(response => { 
            dispatch(loginUserSuccess(response.data))
        })
        .catch(error => {   
            dispatch(loginUserError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 

//-- send OTP
export const sendOTPRequest = () => ({
    type: actionTypes.SEND_OTP_REQUEST
})
export const sendOTPSuccess = (response) => ({
    type: actionTypes.SEND_OTP_SUCCESS,
    payload: {
        response,
    }
})
export const sendOTPError = (error) => ({
    type: actionTypes.SEND_OTP_ERROR,
    payload: {
        error
    }
})
export const sendOTPAction = (data) => {    
    return dispatch => {
        dispatch(sendOTPRequest())
        const FormData = {
            email:data.formData.email,            
        }
        return API.sendOTP(FormData)
        .then(response => { 
            dispatch(sendOTPSuccess(response.data))
        })
        .catch(error => {   
            dispatch(sendOTPError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 



//-- submit OTP
export const submitOTPRequest = () => ({
    type: actionTypes.SUBMIT_OTP_REQUEST
})
export const submitOTPSuccess = (response) => ({
    type: actionTypes.SUBMIT_OTP_SUCCESS,
    payload: {
        response,
    }
})
export const submitOTPError = (error) => ({
    type: actionTypes.SUBMIT_OTP_ERROR,
    payload: {
        error
    }
})
export const submitOTPAction = (data) => {    
    return dispatch => {
        dispatch(submitOTPRequest())
        const FormData = {
            otp:data.formData.otp,            
            email:data.formData.email,            
        }
        return API.submitOTP(FormData)
        .then(response => { 
            dispatch(submitOTPSuccess(response.data))
        })
        .catch(error => {   
            dispatch(submitOTPError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 



//-- submit OTP
export const updatePasswordRequest = () => ({
    type: actionTypes.UPDATE_PASSWORD_REQUEST
})
export const updatePasswordSuccess = (response) => ({
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
    payload: {
        response,
    }
})
export const updatePasswordError = (error) => ({
    type: actionTypes.UPDATE_PASSWORD_ERROR,
    payload: {
        error
    }
})
export const updatePasswordAction = (data) => {    
    return dispatch => {
        dispatch(updatePasswordRequest())
        const FormData = {        
            email:data.formData.email,            
            password:data.formData.password,            
        }
        return API.updatePassword(FormData)
        .then(response => { 
            dispatch(updatePasswordSuccess(response.data))
        })
        .catch(error => {   
            dispatch(updatePasswordError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 

