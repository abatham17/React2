import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/rcm'

//User List
export const rcmTypeListRequest = () => ({
    type: actionTypes.RCM_TYPE_LIST_REQUEST
})
export const rcmTypeListSuccess = (response) => ({
    type: actionTypes.RCM_TYPE_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const rcmTypeListError = (error) => ({
    type: actionTypes.RCM_TYPE_LIST_ERROR,
    payload: {
        error
    }
})
export const rcmTypeListAction = (data) => {
    return dispatch => {
        dispatch(rcmTypeListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"_id",
            direction:"desc"
        }
        return API.rcmTypeList(FormData)
        .then(response => {
            dispatch(rcmTypeListSuccess(response.data))
        })
        .catch(error => {
            dispatch(rcmTypeListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//-- Add Rcm Type
export const addRcmTypeRequest = () => ({
    type: actionTypes.ADD_RCM_TYPE_REQUEST
})
export const addRcmTypeSuccess = (response) => ({
    type: actionTypes.ADD_RCM_TYPE_SUCCESS,
    payload: {
        response,
    }
})
export const addRcmTypeError = (error) => ({
    type: actionTypes.ADD_RCM_TYPE_ERROR,
    payload: {
        error
    }
})
export const addRcmTypeAction = (data) => { 

    return dispatch => {
        dispatch(addRcmTypeRequest())
       
        return API.addRcmType(data)
        .then(response => {
            dispatch(addRcmTypeSuccess(response.data))
        })
        .catch(error => {
            dispatch(addRcmTypeError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}


//-- Delete Rcm Type
export const deleteRcmTypeRequest = () => ({
    type: actionTypes.DELETE_RCM_TYPE_REQUEST
})
export const deleteRcmTypeSuccess = (response) => ({
    type: actionTypes.DELETE_RCM_TYPE_SUCCESS,
    payload: {
        response,
    }
})
export const deleteRcmTypeError = (error) => ({
    type: actionTypes.DELETE_RCM_TYPE_ERROR,
    payload: {
        error
    }
})
export const deleteRcmTypeAction = (data) => { 

    return dispatch => {
        dispatch(deleteRcmTypeRequest())
       
        return API.deleteRcmType(data)
        .then(response => {
            dispatch(deleteRcmTypeSuccess(response.data))
        })
        .catch(error => {
            dispatch(deleteRcmTypeError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

