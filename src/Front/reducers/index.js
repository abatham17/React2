import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import login from './login'
import clinic from './clinic'
import home from './home'
import patient from './patient'
import master from './master'
import diet from './diet'
import settings from './settings'
import rcm from './rcm'

const reducer = combineReducers({
   router: routerReducer,
   login,
   clinic,
   patient,
   home,
   master,
   diet,
   settings,
   rcm
})

export default reducer
