import {postRequestWithToken } from "./helper"


export const companyList = (data) => postRequestWithToken(data, 'admin/clinic-list');
export const addcompany = (data) => postRequestWithToken(data, 'admin/add-clinic');
export const updateClinic = (data) => postRequestWithToken(data, 'admin/edit-clinic'); 
export const changecompanyStatus = (data) => postRequestWithToken(data, 'admin/change-clinic-status');
export const editcompany = (data) => postRequestWithToken(data, 'admin/edit-clinic');

export const clinicSubscription = (data) => postRequestWithToken(data, 'admin/subscription-list');
export const addClinicSubscription = (data) => postRequestWithToken(data, 'admin/add-subscription');
export const updateSubscription = (data) => postRequestWithToken(data, 'admin/edit-subscription'); 
export const changeSubscriptionStatus = (data) => postRequestWithToken(data, 'admin/change-subscription-status');
