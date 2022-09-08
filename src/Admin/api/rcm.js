import { postRequestWithToken } from "./helper"


export const addRcmType = (data) => postRequestWithToken(data, 'add-rcm-type');

export const rcmTypeList = (data) => postRequestWithToken(data, 'get-rcm-types');

export const deleteRcmType = (data) => postRequestWithToken(data, 'delete-rcm-type');
