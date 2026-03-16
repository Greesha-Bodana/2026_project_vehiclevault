import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { UserNavbar } from "../components/user/UserNavbar";
import { CarDetail } from "../components/user/CarDetail";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AllUserList } from "../components/admin/AllUserList";
import { GetApiDemo } from "../components/user/GetApiDemo";
import { UseEffectDemo } from "../components/user/UseEffectDemo";
import { CarList } from "../components/user/CarList";
import { CompareCars } from "../components/user/CompareCars";


const router = createBrowserRouter([
    {path:"/", element:<Login/>},
    {path:"signup", element:<Signup/>},
    {path:"/user", element:<UserNavbar/>,
        children:[
            {path:"carlist", element:<CarList/>},
            {path:"cardetail", element:<CarDetail/>},
            {path:"getapidemo",element:<GetApiDemo/>},
            {path:"useeffectdemo",element:<UseEffectDemo/>},
            {path:"comparecars",element:<CompareCars/>}
        ]
    },
    {
        path:"/admin", element:<AdminSidebar/>,
        children:[
            {path:"allusers", element:<AllUserList/>}
        ]
    }
])
const AppRouter = ()=>{
    return <RouterProvider router={router}></RouterProvider>
}
export default AppRouter