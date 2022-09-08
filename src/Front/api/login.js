import {  postRequest  } from "./helper"


export const signInUser = (data) => postRequest(data, 'login'); 
export const sendOTP = (data) => postRequest(data, 'sendOTP'); 
export const submitOTP = (data) => postRequest(data, 'submitOTP'); 
export const updatePassword = (data) => postRequest(data, 'updatePassword'); 