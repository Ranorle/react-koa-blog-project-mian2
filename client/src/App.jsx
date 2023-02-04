import {createBrowserRouter, RouterProvider,Outlet,} from "react-router-dom";
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
                path:"/",
                element:<Home/>,
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

function App() {
  return (
    <div className="app">
        <ReactLive2d right='-35px' width={300} height={400} TouchDefault={['你好呀','嘻嘻','呀呀呀呀呀呀~']} ModelList={['Hiyori']} menuList={[]}/>
        <div className="container">
            <RouterProvider router={router}/>
        </div>
    </div>
  );
}



export default App;
