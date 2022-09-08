import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  RcmTypeList: false,
  isRcmTypeList: false,
  isRcmTypeError: false,

  AddRcmType: false,
  isAddRcmType: false,
  isAddRcmTypeError: false,

  DeleteRcmType: false,
  isDeleteRcmType: false,
  isDeleteRcmTypeError: false,
}

export default (state = initState, action={}) => {
  switch (action.type) {
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

      // Add User
      case actionTypes.ADD_RCM_TYPE_REQUEST:
      return {
        ...state,
        message: '',
        isAddRcmType: false,
        isAddRcmTypeError: false,
      }
    case actionTypes.ADD_RCM_TYPE_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'Rcm Type Added Successfully',
        AddRcmType: action.payload.response,
        isAddRcmType: true,
        isAddRcmTypeError: false,
      }
    case actionTypes.ADD_RCM_TYPE_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddRcmType: false,
        isAddRcmTypeError: true
      }

      // Delete RCM TYPE
      case actionTypes.DELETE_RCM_TYPE_REQUEST:
      return {
        ...state,
        message: '',
        isDeleteRcmType: false,
        isDeleteRcmTypeError: false,
      }
    case actionTypes.DELETE_RCM_TYPE_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'Rcm Type Deleted Successfully',
        DeleteRcmType: action.payload.response,
        isDeleteRcmType: true,
        isDeleteRcmTypeError: false,
      }
    case actionTypes.DELETE_RCM_TYPE_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isDeleteRcmType: false,
        isDeleteRcmTypeError: true
      } 
     default:
     return state
   }
 }
