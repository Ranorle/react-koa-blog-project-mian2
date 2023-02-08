import React, {useContext, useState} from "react";
import {createBrowserRouter, Link, Outlet, useLocation} from "react-router-dom";
import axios  from "axios";
import { Menu } from 'antd';
import {BarChartOutlined, FileOutlined, FolderOutlined, UserOutlined} from "@ant-design/icons";
import {AuthContext} from "../context/authContext";
import {httpInfo} from "../context/https";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(<Link to='/personal'>用户信息</Link>, 'personal', <UserOutlined />,null,null),
    getItem(<Link to='/personal/control'>文章管理</Link>, 'control', <FileOutlined />,null,null),
    getItem(<Link to='/personal/collection'>个人收藏</Link>, 'collection', <FolderOutlined />,null,null),
    getItem(<Link to='/personal/data'>数据中心</Link>, 'data', <BarChartOutlined />,null,null),
];

const PersonalPage=()=>{
    const location = useLocation()
    let path =location.pathname.split("/")[2]
    if(!path) path='personal'
    return<div className='PersonalPage'>
        <div className='PersonalContent'>
            <div className='PersonalMenu'>
                <div className='MenuTitle'><p>个人中心</p></div>
                <Menu
                    style={{ width: '100%' }}
                    defaultSelectedKeys={[path]}
                    mode="inline"
                    items={items}
                />
            </div>
                <Outlet/>
        </div>
    </div>
}
export default PersonalPage