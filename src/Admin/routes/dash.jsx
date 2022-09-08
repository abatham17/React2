import Dashboard from 'Admin/views/Dashboard/Dashboard.jsx';
import UserPage from 'Admin/views/Pages/UserPage.jsx';
import ClinicList from 'Admin/views/ManageClinic/ClinicList.jsx';
import AddClinic from 'Admin/views/ManageClinic/AddClinic.jsx';
import UpdateClinic from 'Admin/views/ManageClinic/UpdateClinic.jsx';
import UserList from 'Admin/views/ManageUser/UserList.jsx';
import AddUser from 'Admin/views/ManageUser/AddUser.jsx';
import RcmTypeList from 'Admin/views/ManageRcm/RcmTypeList.jsx';
import AddRcmType from 'Admin/views/ManageRcm/AddRcmType.jsx';
import UpdateUser from 'Admin/views/ManageUser/UpdateUser.jsx';
import pagesRoutes from './pages.jsx';

var pages = [ 

    { path: "/admin/update-user", name: "Update User", mini: "AU", component: UpdateUser },
  
].concat(pagesRoutes);
var dashRoutes = [
    { path: "/admin/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { collapse: true, path: "/manage-company", name: "Manage Company", state: "openManageClinic", icon: "pe-7s-plugin", views:[
        { path: "/admin/company-list", name: "Company List", mini: "CL", component: ClinicList },
        { path: "/admin/add-company", name: "Add Company", mini: "AC", component: AddClinic },
        ]
    },
    
    { collapse: true, path: "/manage-user", name: "Manage User", state: "openManageUser", icon: "pe-7s-plugin", views:[
        { path: "/admin/user-list", name: "User List", mini: "UL", component: UserList },
        { path: "/admin/add-user", name: "Add User", mini: "AU", component: AddUser },
        ]
    },
    { collapse: true, path: "/manage-rcm-type-list", name: "Manage Rcm Type", state: "openRcmType", icon: "pe-7s-plugin", views:[
        { path: "/admin/rcm-type-list", name: "RCM Type List", mini: "UL", component: RcmTypeList },
        { path: "/admin/add-rcm-type", name: "Add Rcm Type", mini: "AU", component: AddRcmType },
        ]
    },
    
     { collapse: true, path: "/pages", name: "Pages", state: "openPages", icon:"pe-7s-gift", views:
        pages
     },
    { redirect: true, path: "/", pathTo: "/admin/dashboard", name: "Dashboard" }
];
export default dashRoutes;
