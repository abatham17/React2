import * as actionTypes from './actionTypes'
import * as API from 'Front/api/master'
//Country
export const countryListRequest = () => ({
    type: actionTypes.GET_COUNTRY_LIST_REQUEST
})
export const countryListSuccess = (response) => ({
    type: actionTypes.GET_COUNTRY_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const countryListError = (error) => ({
    type: actionTypes.GET_COUNTRY_LIST_ERROR,
    payload: {
        error
    }
})

export const countryListAction = (data) => {
    return dispatch => {
        dispatch(countryListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.countryList(FormData)
        .then(response => {

            dispatch(countryListSuccess(response.data))
        })
        .catch(error => {
            dispatch(countryListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
//State
export const stateListRequest = () => ({
    type: actionTypes.GET_STATE_LIST_REQUEST
})
export const stateListSuccess = (response) => ({
    type: actionTypes.GET_STATE_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const stateListError = (error) => ({
    type: actionTypes.GET_STATE_LIST_ERROR,
    payload: {
        error
    }
})
export const stateListAction = (data) => {
    return dispatch => {
        dispatch(stateListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc",
            countryId:data
        }
        return API.stateList(FormData)
        .then(response => {
            dispatch(stateListSuccess(response.data))
        })
        .catch(error => {
            dispatch(stateListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Upload File
export const uploadFileRequest = () => ({
    type: actionTypes.UPLOAD_FILE_REQUEST
})
export const uploadFileSuccess = (response) => ({
    type: actionTypes.UPLOAD_FILE_SUCCESS,
    payload: {
        response,
    }
})
export const uploadFileError = (error) => ({
    type: actionTypes.UPLOAD_FILE_ERROR,
    payload: {
        error
    }
})
export const uploadFileAction = (data) => {
    return dispatch => {
        dispatch(uploadFileRequest())  
   
        let formData = new FormData();
        formData.append('file',data.faqfile);
        return API.uploadFile(formData)
        .then(response => {
            dispatch(uploadFileSuccess(response.data))
        })
        .catch(error => {
            dispatch(uploadFileError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}




//Multi Upload File
export const uploadMultiFileRequest = () => ({
    type: actionTypes.UPLOAD_MULTIFILE_REQUEST
})
export const uploadMultiFileSuccess = (response) => ({
    type: actionTypes.UPLOAD_MULTIFILE_SUCCESS,
    payload: {
        response,
    }
})
export const uploadMultiFileError = (error) => ({
    type: actionTypes.UPLOAD_MULTIFILE_ERROR,
    payload: {
        error
    }
})
export const uploadMultiFileAction = (data) => {
    return dispatch => {
        dispatch(uploadMultiFileRequest())  
   
        let formData = new FormData();
        for(let x in data){
            formData.append('file',data[x]);
        }        
        return API.uploadMultiFile(formData)
        .then(response => {
            dispatch(uploadMultiFileSuccess(response.data))
        })
        .catch(error => {
            dispatch(uploadMultiFileError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//User List
export const userListRequest = () => ({
    type: actionTypes.GET_USER_LIST_REQUEST
})
export const userListSuccess = (response) => ({
    type: actionTypes.GET_USER_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const userListError = (error) => ({
    type: actionTypes.GET_USER_LIST_ERROR,
    payload: {
        error
    }
})

export const userListAction = (data) => {
    return dispatch => {
        dispatch(userListRequest())
        const FormData = {
            limit:1000,
            offset:0,
            order:"userName",
            direction:"asc"
        }
        return API.userList(FormData)
        .then(response => {

            dispatch(userListSuccess(response.data))
        })
        .catch(error => {
            dispatch(userListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

