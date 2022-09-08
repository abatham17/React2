import {  postRequestWithToken } from "./helper"
export const addRcm = (data) => postRequestWithToken(data, 'add-rcm'); 
export const listRcm = (data) => postRequestWithToken(data, 'rcm-list'); 
export const getRcmData = (data) => postRequestWithToken(data, 'get-rcm-data'); 
export const addRcmDataRow = (data) => postRequestWithToken(data, 'add-rcm-data'); 
export const removeRcmDataRow = (data) => postRequestWithToken(data, 'remove-rcm-data-row'); 
export const changeRcmRowStatus = (data) => postRequestWithToken(data, 'change-rcm-row-status'); 
export const addAttachement = (data) => postRequestWithToken(data, 'add-rcm-data-row'); 
export const updateRcmRowData = (data) => postRequestWithToken(data, 'update-rcm-data-row'); 
export const removeRcm = (data) => postRequestWithToken(data, 'remove-rcm'); 
export const rcmTypeList = (data) => postRequestWithToken(data, 'get-rcm-types');
export const updateRcm = (data) => postRequestWithToken(data, 'update-rcm');