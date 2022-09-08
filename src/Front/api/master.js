import { postRequestWithToken } from "./helper"

export const uploadFile = (data) => postRequestWithToken(data, 'upload-file');

export const stateList = (data) => postRequestWithToken(data, 'state-list');

export const countryList = (data) => postRequestWithToken(data, 'country-list');

export const uploadMultiFile = (data) => postRequestWithToken(data, 'multi-upload-file');

export const userList = (data) => postRequestWithToken(data, 'user-list');

