import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {httpInfo} from "./https";
import {message} from "antd";

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
    const changeinfo=async (inputs)=>{
        try{const res=await axios.post(httpInfo+`/auth/updateinfo/`,inputs)
        setCurrentUser(res.data)
        message.success('修改成功！')}catch(err){
            console.log(err)
            message.error('修改失败')}
    }
    const changepassword=async (inputs)=>{
        try{await axios.post(httpInfo+`/auth/passwordchange`,inputs)
        message.success('修改成功！')
        }catch (err){
            console.log(err.response.data)
            message.error(`修改失败,${err.response.data}`)
        }
    }

    useEffect(()=>{
        sessionStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])
    return <AuthContext.Provider value={{currentUser,changeinfo, changepassword,login, logout}}>
        {children}
    </AuthContext.Provider>
}
