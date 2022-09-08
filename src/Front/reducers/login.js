import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  loginCheck:false,
  isLogin:false,
  isLoginError: false,
  SendOtp: false,   
  isSendOtp: false,
  isSendOtpError: false,
  SubmitOtp: false,   
  isSubmitOtp: false,
  isSubmitOtpError: false,
  UpdatePassword: false,   
  isUpdatePassword: false,
  isUpdatePasswordError: false,
} 
 
export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_SIGNIN_USER_REQUEST:
      return {
        ...state,
        message: '',
        isLogin: false,
        isLoginError: false,
      }
    case actionTypes.GET_SIGNIN_USER_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'Logged in successfully',   
        LoginData: action.payload.response,   
        isLogin: true,
        isLoginError: false,
      }
    case actionTypes.GET_SIGNIN_USER_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isLogin: false,
        isLoginError: true
      }    

    case actionTypes.SEND_OTP_REQUEST:
      return {
        ...state,
        message: '',
        isSendOtp: false,
        isSendOtpError: false,
      }
    case actionTypes.SEND_OTP_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'OTP sent successfully',   
        SendOtp: action.payload.response,   
        isSendOtp: true,
        isSendOtpError: false,
      }
    case actionTypes.SEND_OTP_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isSendOtp: false,
        isSendOtpError: true
      }  

    case actionTypes.SUBMIT_OTP_REQUEST:
      return {
        ...state,
        message: '',
        isSubmitOtp: false,
        isSubmitOtpError: false,
      }
    case actionTypes.SUBMIT_OTP_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'OTP Submit successfully',   
        SubmitOtp: action.payload.response,   
        isSubmitOtp: true,
        isSubmitOtpError: false,
      }
    case actionTypes.SUBMIT_OTP_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isSubmitOtp: false,
        isSubmitOtpError: true
      } 

    case actionTypes.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        message: '',
        isUpdatePassword: false,
        isUpdatePasswordError: false,
      }
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'Password Update successfully',   
        UpdatePassword: action.payload.response,   
        isUpdatePassword: true,
        isUpdatePasswordError: false,
      }
    case actionTypes.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdatePassword: false,
        isUpdatePasswordError: true
      }  


    default:
    return state
  }
}
