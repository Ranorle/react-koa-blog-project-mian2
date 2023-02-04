import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {httpInfo} from "./https";

export const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
    //这个是读取sessionStorage里的user数据
    const [currentUser,setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null)
    const login =async (inputs)=>{
        const res =await axios.post(httpInfo+"/auth/login",inputs)
    setCurrentUser(res.data)
    }
    const logout =async (inputs)=>{
       await axios.post(httpInfo+"/auth/logout")
        setCurrentUser(null)
    }
    useEffect(()=>{
        sessionStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])
    return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>
}
