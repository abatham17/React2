import * as actionTypes from './actionTypes'
import * as API from 'Front/api/rcm'


//add Rcm
export const addRcmRequest = () => ({
    type: actionTypes.ADD_RCM_REQUEST
})
export const addRcmSuccess = (response) => ({
    type: actionTypes.ADD_RCM_SUCCESS,
    payload: {
        response,
    }
})
export const addRcmError = (error) => ({
    type: actionTypes.ADD_RCM_ERROR,
    payload: {
        error
    }
})
export const addRcmAction = (data) => {    
    return dispatch => {
        dispatch(addRcmRequest())        

        return API.addRcm(data)
        .then(response => { 
            dispatch(addRcmSuccess(response.data))
        })
        .catch(error => {   
            dispatch(addRcmError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


//update Rcm
export const updateRcmRequest = () => ({
    type: actionTypes.UPDATE_RCM_REQUEST
})
export const updateRcmSuccess = (response) => ({
    type: actionTypes.UPDATE_RCM_SUCCESS,
    payload: {
        response,
    }
})
export const updateRcmError = (error) => ({
    type: actionTypes.UPDATE_RCM_ERROR,
    payload: {
        error
    }
})
export const updateRcmAction = (data) => {    
    return dispatch => {
        dispatch(updateRcmRequest())        

        return API.updateRcm(data)
        .then(response => { 
            dispatch(updateRcmSuccess(response.data))
        })
        .catch(error => {   
            dispatch(updateRcmError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 



//add Rcm Data Row
export const addRcmDataRowRequest = () => ({
    type: actionTypes.ADD_RCM_DATA_ROW_REQUEST
})
export const addRcmDataRowSuccess = (response) => ({
    type: actionTypes.ADD_RCM_DATA_ROW_SUCCESS,
    payload: {
        response,
    }
})
export const addRcmDataRowError = (error) => ({
    type: actionTypes.ADD_RCM_DATA_ROW_ERROR,
    payload: {
        error
    }
})
export const addRcmDataRowAction = (data) => {    
    return dispatch => {
        dispatch(addRcmDataRowRequest())     
        let rcm_data = {};
        let params;
        if(data.bulkupload == false){
            for(let i in data.rcm_data){
                
                rcm_data[data.rcm_data[i].key] = data.rcm_data[i].value;
                
            }

              params = {
                rcm_id: data.rcm_id,
                rcm_data: [rcm_data],
                attachments: data.attachments,
                bulkupload:data.bulkupload
            }
        }else{
              params = {
                    rcm_id: data.rcm_id,
                    rcm_data: data.rcm_data,
                    attachments: data.attachments,
                    bulkupload:data.bulkupload,
                    manager:data.manager,
                    userId:data.userId,
                    userName:data.userName,
                }
        }

        return API.addRcmDataRow(params)
        .then(response => { 
            dispatch(addRcmDataRowSuccess(response.data))
        })
        .catch(error => {   
            dispatch(addRcmDataRowError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 

//remove Rcm Data Row
export const removeRcmDataRowRequest = () => ({
    type: actionTypes.REMOVE_RCM_DATA_ROW_REQUEST
})
export const removeRcmDataRowSuccess = (response) => ({
    type: actionTypes.REMOVE_RCM_DATA_ROW_SUCCESS,
    payload: {
        response,
    }
})
export const removeRcmDataRowError = (error) => ({
    type: actionTypes.REMOVE_RCM_DATA_ROW_ERROR,
    payload: {
        error
    }
})
export const removeRcmDataRowAction = (data) => {    
    return dispatch => {
        dispatch(removeRcmDataRowRequest())     
        
        return API.removeRcmDataRow(data)
        .then(response => { 
            dispatch(removeRcmDataRowSuccess(response.data))
        })
        .catch(error => {   
            dispatch(removeRcmDataRowError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


//List Rcm
export const ListRcmRequest = () => ({
    type: actionTypes.LIST_RCM_REQUEST
})
export const ListRcmSuccess = (response) => ({
    type: actionTypes.LIST_RCM_SUCCESS,
    payload: {
        response,
    }
})
export const ListRcmError = (error) => ({
    type: actionTypes.LIST_RCM_ERROR,
    payload: {
        error
    }
})
export const ListRcmAction = (data) => {    
    return dispatch => {
        dispatch(ListRcmRequest())        
        
        const params = {
            "limit":-1,
            "offset":0,
            "order":"status",
            "direction":"desc",
            "userId":data.userId,
            "manager":data.manager
            }
        return API.listRcm(params)
        .then(response => { 
            dispatch(ListRcmSuccess(response.data))
        })
        .catch(error => {   
            dispatch(ListRcmError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 




//Get Rcm Data
export const getRcmDataRequest = () => ({
    type: actionTypes.GET_RCMDATA_REQUEST
})
export const getRcmDataSuccess = (response) => ({
    type: actionTypes.GET_RCMDATA_SUCCESS,
    payload: {
        response,
    }
})
export const getRcmDataError = (error) => ({
    type: actionTypes.GET_RCMDATA_ERROR,
    payload: {
        error
    }
})
export const getRcmDataAction = (data) => {    
    return dispatch => {
        dispatch(getRcmDataRequest()) 
        const params = {
            "rcm_id":data     
            }
        return API.getRcmData(params)
        .then(response => { 
            dispatch(getRcmDataSuccess(response.data))
        })
        .catch(error => {   
            dispatch(getRcmDataError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 





//change Rcm Row Status
export const changeRcmRowStatusRequest = () => ({
    type: actionTypes.CHANGE_RCM_ROW_STATUS_REQUEST
})
export const changeRcmRowStatusSuccess = (response) => ({
    type: actionTypes.CHANGE_RCM_ROW_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const changeRcmRowStatusError = (error) => ({
    type: actionTypes.CHANGE_RCM_ROW_STATUS_ERROR,
    payload: {
        error
    }
})
export const changeRcmRowStatusAction = (data) => {    
    return dispatch => {
        dispatch(changeRcmRowStatusRequest())         
      
        return API.changeRcmRowStatus(data)
        .then(response => { 
            dispatch(changeRcmRowStatusSuccess(response.data))
        })
        .catch(error => {   
            dispatch(changeRcmRowStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 




//add Attachement
export const addAttachementRequest = () => ({
    type: actionTypes.ADD_ATTACHEMENT_REQUEST
})
export const addAttachementSuccess = (response) => ({
    type: actionTypes.ADD_ATTACHEMENT_SUCCESS,
    payload: {
        response,
    }
})
export const addAttachementError = (error) => ({
    type: actionTypes.ADD_ATTACHEMENT_ERROR,
    payload: {
        error
    }
})
export const addAttachementAction = (data) => {    
    return dispatch => {
        dispatch(addAttachementRequest())         
        
        const params = {
            rcm_data_row_id : data.rcm_data_row_id,
            media : data.media
        }

        return API.addAttachement(params)
        .then(response => { 
            dispatch(addAttachementSuccess(response.data))
        })
        .catch(error => {   
            dispatch(addAttachementError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 


//update Rcm Row Data
export const updateRcmRowDataRequest = () => ({
    type: actionTypes.UPDATE_RCM_ROW_DATA_REQUEST
})
export const updateRcmRowDataSuccess = (response) => ({
    type: actionTypes.UPDATE_RCM_ROW_DATA_SUCCESS,
    payload: {
        response,
    }
})
export const updateRcmRowDataError = (error) => ({
    type: actionTypes.UPDATE_RCM_ROW_DATA_ERROR,
    payload: {
        error
    }
})
export const updateRcmRowDataAction = (data) => {    
    return dispatch => {
        dispatch(updateRcmRowDataRequest())         
        
        const params = {
            rcm_data_row_id : data.rcm_data_id,
            rcm_row_data : data.rcm_row_data,
            status:data.status,
            approve:data.approve,
        }

        return API.updateRcmRowData(params)
        .then(response => { 
            dispatch(updateRcmRowDataSuccess(response.data))
        })
        .catch(error => {   
            dispatch(updateRcmRowDataError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 




//remove Rcm Action
export const removeRcmRequest = () => ({
    type: actionTypes.REMOVE_RCM_REQUEST
})
export const removeRcmSuccess = (response) => ({
    type: actionTypes.REMOVE_RCM_SUCCESS,
    payload: {
        response,
    }
})
export const removeRcmError = (error) => ({
    type: actionTypes.REMOVE_RCM_ERROR,
    payload: {
        error
    }
})
export const removeRcmAction = (data) => {    
    return dispatch => {
        dispatch(removeRcmRequest())     
        
        return API.removeRcm(data)
        .then(response => { 
            dispatch(removeRcmSuccess(response.data))
        })
        .catch(error => {   
            dispatch(removeRcmError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
} 




//Rcm Type List
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