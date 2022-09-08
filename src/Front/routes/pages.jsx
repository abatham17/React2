import LoginPage from 'Front/views/Login/LoginPage.jsx';
import ForgetPasswordPage from 'Front/views/Login/ForgetPassword.jsx';
import EditRcm from 'Front/views/EditRcm/EditRcm.jsx';
import Dashboard from 'Front/views/Dashboard/Dashboard.jsx';
import ColorNotations from 'Front/views/Pages/ColorNotations/ColorNotations.jsx';
import ChangePassword from 'Front/views/Pages/ChangePassword/ChangePassword.jsx';
let userType = localStorage.getItem('userType');
let pagesRoutes = [];

if(userType === 'receptionist')
{   

    pagesRoutes = [    
    { path: "/change-password", name: "Change Password", icon: "pe-7s-graph", component: ChangePassword },
    { path: "/dashboard", name: "Dashboard", mini: "DB", component: Dashboard },
    { path: "/", name: "Dashboard", mini: "DB", component: Dashboard },
   ];

}else{ 
     pagesRoutes = [
  
    { path: "/shortcut-key", name: "Shortcut Key", icon: "pe-7s-graph", component: ColorNotations },
    { path: "/change-password", name: "Change Password", icon: "pe-7s-graph", component: ChangePassword },  
    { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/forget-password", name: "Forget Password", mini: "LP", component: ForgetPasswordPage },
    { path: "/dashboard", name: "Dashboard", mini: "DB", component: Dashboard },
    { path: "/edit-rcm", name: "EditRcm", mini: "PS", component: EditRcm },
    { path: "/", name: "Dashboard", mini: "DB", component: Dashboard },
  ];
}


export default pagesRoutes;
