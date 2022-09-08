import * as actionTypes from './actionTypes'
import * as API from 'Admin/api/clinic'


//-- List
export const companyListRequest = () => ({
    type: actionTypes.GET_COMPANY_LIST_REQUEST
})
export const companyListSuccess = (response) => ({
    type: actionTypes.GET_COMPANY_LIST_SUCCESS,
    payload: {
        response,
    }
})
export const companyListError = (error) => ({
    type: actionTypes.GET_COMPANY_LIST_ERROR,
    payload: {
        error
    }
})
export const companyListAction = (data) => {
    return dispatch => {
        dispatch(companyListRequest())
        const FormData = {
            limit:10,
            offset:0,
            order:"name",
            direction:"asc"
        }
        return API.companyList(FormData)
        .then(response => {
            dispatch(companyListSuccess(response.data))
        })
        .catch(error => {
            dispatch(companyListError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//--Add company
export const addcompanyRequest = () => ({
    type: actionTypes.POST_ADD_COMPANY_REQUEST
})
export const addcompanySuccess = (response) => ({
    type: actionTypes.GET_ADD_COMPANY_SUCCESS,
    payload: {
        response,
    }
})
export const addcompanyError = (error) => ({
    type: actionTypes.GET_ADD_COMPANY_ERROR,
    payload: {
        error
    }
})
export const addcompanyAction = (data) => {
    return dispatch => {

        dispatch(addcompanyRequest())
        
        const formData = {
        company_name: data.formData.company_name,
        short_name: data.formData.short_name,
        
        address: data.formData.address,
        city: data.formData.city,
        state: data.formData.state,
        state_id: data.formData.state_id,
        country_id: data.formData.country_id,
        country: data.formData.country,
        pin_code: data.formData.pin_code,
        phone: data.formData.phoneno,
        mobile_no: data.formData.mobile_no,        
        email: data.formData.email,
        
    }

        return API.addcompany(formData)
        .then(response => {
            dispatch(addcompanySuccess(response.data))
        })
        .catch(error => {
            dispatch(addcompanyError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}



/* company Status Change  */
export const companyChangeStatusRequest = () => ({
    type: actionTypes.GET_COMPANY_CHANGE_STATUS_REQUEST
})
export const companyChangeStatusSuccess = (response) => ({
    type: actionTypes.GET_COMPANY_CHANGE_STATUS_SUCCESS,
    payload: {
        response,
    }
})
export const companyChangeStatusError = (error) => ({
    type: actionTypes.GET_COMPANY_CHANGE_STATUS_ERROR,
    payload: {
        error
    }
})
export const companychangestatusAction = (data) => {
    return dispatch => {
        dispatch(companyChangeStatusRequest())
        const FormData = {
            id:data._id,
            status:data.status
        }
        return API.changecompanyStatus(FormData)
        .then(response => {
            console.log(response)
            dispatch(companyChangeStatusSuccess(response.data))
        })
        .catch(error => {
            dispatch(companyChangeStatusError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}

//Update company

export const updatecompanyRequest = () => ({
    type: actionTypes.POST_UPDATE_COMPANY_REQUEST
})
export const updatecompanySuccess = (response) => ({
    type: actionTypes.GET_UPDATE_COMPANY_SUCCESS,
    payload: {
        response,
    }
})


export const updatecompanyError = (error) => ({
    type: actionTypes.GET_UPDATE_COMPANY_ERROR,
    payload: {
        error
    }
})


export const updatecompanyAction = (data) => {
  debugger
    return dispatch => {
        dispatch(updatecompanyRequest())
        
        /*const holiday_date = [];

        for(let i in data.formData.holiday_date){
            holiday_date.push(data.formData.holiday_date[i]);
        }*/

        const holiday_date = data.formData.holiday_date.split(",");

        const formData = {
          id: data.formData.id,
          sendMail: data.sendMail,
        company_name: data.formData.company_name,
        short_name: data.formData.short_name,
        web: data.formData.company_website,
        address: data.formData.address,
        city: data.formData.city,
        state: data.formData.state,
        state_id: data.formData.state_id,
        country_id: data.formData.country_id,
        country: data.formData.country,
        pin_code: data.formData.pin_code,
        phone: data.formData.phoneno,
        mobile_no: data.formData.mobile_no,
        appointmentno: data.formData.appointment_no,
        emergency: data.formData.emergency_no,
        email: data.formData.email,
        start_time: data.formData.start_time,
        end_time: data.formData.end_time,
        start_time2: data.formData.start_time2,
        end_time2: data.formData.end_time2,
        pattern: data.formData.pattern,
        is_email_facility: data.formData.email_facility,
        data_updated: data.formData.data_updated,
        status: data.formData.status,
        appointment_reminder: data.formData.appointment_notification,
        background_image: data.formData.background_image,
        contact_image: data.formData.contact_image,
        logo_image: data.formData.logo_image,
        lat: data.formData.latitude,
        long: data.formData.longitude,
        diet_print_format: data.formData.diet_print_format,
        print_header_margin: data.formData.margin_top,
        bottom_margin: data.formData.margin_bottom,
        top_margin: data.formData.margin_top,
        left_margin: data.formData.margin_left,
        right_margin: data.formData.margin_right,
        week_off: data.formData.week_off,
        holiday_date: holiday_date,
        specializations: data.formData.specialization}

        return API.editcompany(formData)
        .then(response => {
            debugger
            dispatch(updatecompanySuccess(response.data))
        })
        .catch(error => {
          debugger
            dispatch(updatecompanyError(error.response !== undefined ? error.response.data : "Internet Connection Error"))
        })
    }
}
