import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isCompanyList:false,
  isCompanyListError: false,
  CompanyList: false,

  isAddCompany:false,
  isAddCompanyError:false,
  addCompanyResponse:'',

  isCompanyChangeStatus:false,
  isCompanyChangeStatusError:false,
  CompanyChangeStatusResponse:'',

  isUpdateCompany:false,
  isUpdateCompanyError:false,
  updateCompanyResponse:'',

}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_COMPANY_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isCompanyList: false,
        isCompanyListError: false,
      }
    case actionTypes.GET_COMPANY_LIST_SUCCESS:
      return {
        ...state,
        message: 'Company List successfully',
        CompanyList: action.payload.response,
        isCompanyList: true,
        isCompanyListError: false,
      }
    case actionTypes.GET_COMPANY_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isCompanyList: false,
        isCompanyListError: true
      }
      case actionTypes.POST_ADD_COMPANY_REQUEST:
        return {
          ...state,
          message: '',
          isAddCompany: false,
          isAddCompanyError: false,
        }
      case actionTypes.GET_ADD_COMPANY_SUCCESS:
        return {
          ...state,
          message: 'Company List successfully',
          addCompanyResponse: action.payload.response,
          isAddCompany: true,
          isAddCompanyError: false,
        }
      case actionTypes.GET_ADD_COMPANY_ERROR:
        return {
          ...state,
          addCompanyResponse: action.payload.error,
          message: action.payload.error,
          isAddCompany: false,
          isAddCompanyError: true
        }
        case actionTypes.POST_UPDATE_COMPANY_REQUEST:
          return {
            ...state,
            message: '',
            isUpdateCompany: false,
            isUpdateCompanyError: false,
          }
        case actionTypes.GET_UPDATE_COMPANY_SUCCESS:
        debugger
          return {
            ...state,
            message: 'Company Updated successfully',
            updateCompanyResponse: action.payload.response,
            isUpdateCompany: true,
            isUpdateCompanyError: false,
          }
        case actionTypes.GET_UPDATE_COMPANY_ERROR:
        debugger
          return {
            ...state,
            updateCompanyResponse: action.payload.error,
            message: action.payload.error,
            isUpdateCompany: false,
            isUpdateCompanyError: true
          }

      //Company Status Change
      case actionTypes.GET_COMPANY_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isCompanyChangeStatus: false,
        isCompanyChangeStatusError: false,
      }
    case actionTypes.GET_COMPANY_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Company Status Changed',
        CompanyChangeStatus: action.payload.response,
        isCompanyChangeStatus: true,
        isCompanyChangeStatusError: false,
      }
    case actionTypes.GET_COMPANY_CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isCompanyChangeStatus: false,
        isCompanyChangeStatusError: true
      }
    default:
    return state
  }
}
