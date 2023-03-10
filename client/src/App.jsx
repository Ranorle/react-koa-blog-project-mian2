import {createBrowserRouter, RouterProvider, Outlet, BrowserRouter,Routes,Route} from "react-router-dom";
import ReactLive2d from 'react-live2d';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import "./style.scss"
import React from "react";
import PersonalPage from "./pages/PersonalPage";
import UserInfo from "./PersonalComponents/userInfo";
import ArticleControl from "./PersonalComponents/articleControl";
import CollectionInfo from "./PersonalComponents/collectionInfo";
import DataInfo from "./PersonalComponents/dataInfo";
const Layout =()=>{
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/post/:id",
                element:<Single/>,
            },
            {
                path:"/write",
                element:<Write/>,
            },
            {
                path:"/personal",
                element:<PersonalPage/>,
                children:[{
                    path:'/personal/',
                    element:<UserInfo/>,
                },{
                    path:'/personal/control',
                    element:<ArticleControl/>,
                },{
                    path:'/personal/collection',
                    element:<CollectionInfo/>,
                },{
                    path:'/personal/data',
                    element:<DataInfo/>,
                },],
            },
        ]
},
    {
        path:"/register",
        element:<Register/>,
    },
    {
        path:"/login",
        element:<Login/>,
    },
    {
        path:"/write",
        element:<Write/>,
    },
    {
        path:"/single",
        element:<Single/>,
    },

])
console.log(router)
function App() {
  return (
    <div className="app">
        <ReactLive2d right='-35px' width={300} height={400} TouchDefault={['?????????','??????','??????????????????~']} ModelList={['Hiyori']} menuList={[]}/>
        <div className="container">
            <RouterProvider router={router}/>
        </div>
    </div>
  );
}



export default App;
