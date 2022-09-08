import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  
  isAddRcm:false,
  isAddRcmError: false,
  AddRcm: false,
  
  isListRcm: false,
  isListRcmError: false,
  ListRcm: false,

  isRcmData: false,
  isRcmDataError: false,
  RcmData: false,

  isAddRcmDataRow: false,
  isAddRcmDataRowError: false,
  AddRcmDataRow: false,

  RemoveRcmDataRow: false,   
  isRemoveRcmDataRow: false,
  isRemoveDataRowError: false,

  ChangeDataRowStatus: false,   
  isChangeDataRowStatus: false,
  isChangeDataRowStatusError: false,

  AddAttachement: false,   
  isAddAttachement: false,
  isAddAttachementError: false,

  UpdateRcmDataRow: false,
  isUpdateRcmDataRow: false,
  isUpdateRcmDataRowError: false,
  
  RemoveRcm: false,   
  isRemoveRcm: false,
  isRemoveRcmError: false,

  RcmTypeList: false,
  isRcmTypeList: false,
  isRcmTypeError: false,

  UpdateRcm: false,   
  isUpdateRcm: false,
  isUpdateRcmError: false,
} 
 
export default (state = initState, action={}) => {
  switch (action.type) {
  
    case actionTypes.ADD_RCM_REQUEST:
      return {
        ...state,
        message: '',
        isAddRcm: false,
        isAddRcmError: false,
      }
    case actionTypes.ADD_RCM_SUCCESS:
      return {
        ...state,
        message: 'RCM Successfully Added!',   
        AddRcm: action.payload.response,   
        isAddRcm: true,
        isAddRcmError: false,
      }
    case actionTypes.ADD_RCM_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddRcm: false,
        isAddRcmError: true
      } 

     case actionTypes.UPDATE_RCM_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateRcm: false,
        isUpdateRcmError: false,
      }
    case actionTypes.UPDATE_RCM_SUCCESS:
      return {
        ...state,
        message: 'RCM Successfully Updated!',   
        UpdateRcm: action.payload.response,   
        isUpdateRcm: true,
        isUpdateRcmError: false,
      }
    case actionTypes.UPDATE_RCM_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateRcm: false,
        isUpdateRcmError: true
      }   


    case actionTypes.LIST_RCM_REQUEST:
      return {
        ...state,
        message: '',
        isListRcm: false,
        isListRcmError: false,
      }
    case actionTypes.LIST_RCM_SUCCESS:
      return {
        ...state,
        message: 'RCM Successfully Listed!',   
        ListRcm: action.payload.response,   
        isListRcm: true,
        isListRcmError: false,
      }
    case actionTypes.LIST_RCM_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isListRcm: false,
        isListRcmError: true
      } 

    case actionTypes.GET_RCMDATA_REQUEST:
      return {
        ...state,
        message: '',
        isRcmData: false,
        isRcmDataError: false,
      }
    case actionTypes.GET_RCMDATA_SUCCESS:
      return {
        ...state,
        message: 'RCM Data Get Successfully!',   
        RcmData: action.payload.response,   
        isRcmData: true,
        isRcmDataError: false,
      }
    case actionTypes.GET_RCMDATA_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isRcmData: false,
        isRcmDataError: true
      }   


     case actionTypes.ADD_RCM_DATA_ROW_REQUEST:
      return {
        ...state,
        message: '',
        isAddRcmDataRow: false,
        isAddRcmDataRowError: false,
      }
    case actionTypes.ADD_RCM_DATA_ROW_SUCCESS:
      return {
        ...state,
        message: 'RCM Data Row Added Successfully!',   
        AddRcmDataRow: action.payload.response,   
        isAddRcmDataRow: true,
        isAddRcmDataRowError: false,
      }
    case actionTypes.ADD_RCM_DATA_ROW_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddRcmDataRow: false,
        isAddRcmDataRowError: true
      } 

    case actionTypes.REMOVE_RCM_DATA_ROW_REQUEST:
      return {
        ...state,
        message: '',
        isRemoveRcmDataRow: false,
        isRemoveDataRowError: false,
      }
    case actionTypes.REMOVE_RCM_DATA_ROW_SUCCESS:
      return {
        ...state,
        message: 'RCM Data Row Removed Successfully!',   
        RemoveRcmDataRow: action.payload.response,   
        isRemoveRcmDataRow: true,
        isRemoveDataRowError: false,
      }
    case actionTypes.REMOVE_RCM_DATA_ROW_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isRemoveRcmDataRow: false,
        isRemoveDataRowError: true
      } 

    
    case actionTypes.CHANGE_RCM_ROW_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isChangeDataRowStatus: false,
        isChangeDataRowStatusError: false,
      }
    case actionTypes.CHANGE_RCM_ROW_STATUS_SUCCESS:
      return {
        ...state,
        message: 'RCM Data Row Status Changed Successfully!',   
        ChangeDataRowStatus: action.payload.response,   
        isChangeDataRowStatus: true,
        isChangeDataRowStatusError: false,
      }
    case actionTypes.CHANGE_RCM_ROW_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isChangeDataRowStatus: false,
        isChangeDataRowStatusError: true
      } 


    case actionTypes.ADD_ATTACHEMENT_REQUEST:
      return {
        ...state,
        message: '',
        isAddAttachement: false,
        isAddAttachementError: false,
      }
    case actionTypes.ADD_ATTACHEMENT_SUCCESS:
      return {
        ...state,  
        AddAttachement: action.payload.response,   
        isAddAttachement: true,
        isAddAttachementError: false,
      }
    case actionTypes.ADD_ATTACHEMENT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddAttachement: false,
        isAddAttachementError: true
      } 


    case actionTypes.UPDATE_RCM_ROW_DATA_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateRcmDataRow: false,
        isUpdateRcmDataRowError: false,
      }
    case actionTypes.UPDATE_RCM_ROW_DATA_SUCCESS:
      return {
        ...state,  
        UpdateRcmDataRow: action.payload.response,   
        isUpdateRcmDataRow: true,
        isUpdateRcmDataRowError: false,
      }
    case actionTypes.UPDATE_RCM_ROW_DATA_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateRcmDataRow: false,
        isUpdateRcmDataRowError: true
      } 

      
    case actionTypes.REMOVE_RCM_REQUEST:
      return {
        ...state,
        message: '',
        isRemoveRcm: false,
        isRemoveRcmError: false,
      }
    case actionTypes.REMOVE_RCM_SUCCESS:
      return {
        ...state,
        message: 'RCM Removed Successfully!',   
        RemoveRcm: action.payload.response,   
        isRemoveRcm: true,
        isRemoveRcmError: false,
      }
    case actionTypes.REMOVE_RCM_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isRemoveRcm: false,
        isRemoveRcmError: true
      } 

     case actionTypes.RCM_TYPE_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isRcmTypeList: false,
        isRcmTypeError: false,
      }
    case actionTypes.RCM_TYPE_LIST_SUCCESS:
      return {
        ...state,
        message: 'Rcm Type List successfully',
        RcmTypeList: action.payload.response,
        isRcmTypeList: true,
        isRcmTypeError: false,
      }
    case actionTypes.RCM_TYPE_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isRcmTypeList: false,
        isRcmTypeError: true
      }  

    default:
    return state
  }
}


