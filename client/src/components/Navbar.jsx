import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import Logo1 from "../img/logo1.png"
import Logo2 from "../img/logo2.png"
import {AuthContext} from "../context/authContext";
import {Button, message, notification, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";

const Navbar =()=>{
    const [messageApi, contextHolder2] = message.useMessage();
    const [api, contextHolder] = notification.useNotification();
    const {currentUser,logout} = useContext(AuthContext)

    const openNotification =  () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button type="link" size="small" onClick={() => api.destroy()}>
                    取消
                </Button>
                <Button type="primary" size="small" onClick={async () => {
                    await logout()
                    setstyle1({color:""})
                    setstyle2({color:""})
                    setstyle3({color:""})
                    setstyle4({color:""})
                        logout()
                    api.destroy(key)
                    messageApi.success('登出成功')
                }}>
                    确定
                </Button>
            </Space>
        );
        api.open({
            message: '注意',
            description:
                '你真的要注销登录吗？',
            btn,
            key,
        });
    };

    const [style1,setstyle1]=useState({color:"lightblue",fontWeight:"800",})
    const [style2,setstyle2]=useState({})
    const [style3,setstyle3]=useState({})
    const [style4,setstyle4]=useState({})
    // console.log(currentUser)
    // console.log(style)
    return<div className='navbar'>
        {contextHolder}
        {contextHolder2}
        <div className='container'>
            <div className='logo'>
                <Link to="/" onClick={()=>{
                    setstyle1({color:"lightblue",fontWeight:"800",})
                    setstyle2({color:""})
                    setstyle3({color:""})
                    setstyle4({color:""})
                }}>
                    <img src={Logo1} />
                    <img src={Logo2}/>
                </Link>
            </div>
            <div className='links'>
                <div className='linksDiv'>
                <Link className='link' to='/?cat=blogs'><div className='linkDiv' tabIndex="1"  onClick={()=>{
                    setstyle1({color:"lightblue",fontWeight:"800",})
                    setstyle2({color:""})
                    setstyle3({color:""})
                    setstyle4({color:""})
                }}><h6 style={style1}>博客</h6></div></Link>
                <Link className='link' to='/?cat=writes'><div className='linkDiv' tabIndex="2" onClick={()=>{
                    setstyle1({color:""})
                    setstyle2({color:"lightblue",fontWeight:"800"})
                    setstyle3({color:""})
                    setstyle4({color:""})
                }}><h6 style={style2}>笔记</h6></div></Link>
                <Link className='link' to='/?cat=readings'><div className='linkDiv' tabIndex="3" onClick={()=>{
                    setstyle1({color:""})
                    setstyle2({color:""})
                    setstyle3({color:"lightblue",fontWeight:"800"})
                    setstyle4({color:""})
                }}><h6 style={style3}>阅读</h6></div></Link>
                <Link className='link' to='/?cat=games'><div className='linkDiv' tabIndex="4" onClick={()=>{
                    setstyle1({color:""})
                    setstyle2({color:""})
                    setstyle3({color:""})
                    setstyle4({color:"lightblue",fontWeight:"800"})
                }}><h6 style={style4}>游戏</h6></div></Link>
                </div>
                {currentUser && <div className='navuserinfo'>
                    <img src={currentUser.img}/>
                    <p>{currentUser?.username}</p>
                </div>}
                {currentUser ? <Button  shape="round" onClick={openNotification}>登出</Button> :<Link className='link' to="/login"><Button shape="round">登录</Button></Link>}
                {currentUser && <Link className='link' to="/write"><Button style={{border:0}} size='large' shape="primary" icon={<EditOutlined /> } onClick={()=>{
                    setstyle1({color:""})
                    setstyle2({color:""})
                    setstyle3({color:""})
                    setstyle4({color:""})
                }
                }>Write</Button></Link>}
            </div>
        </div>
    </div>
}
export default Navbar