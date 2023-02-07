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
    getItem(<Link to='/personal'>用户信息</Link>, 'sub1', <UserOutlined />,null,null),
    getItem(<Link to='/personal/control'>文章管理</Link>, 'sub2', <FileOutlined />,null,null),
    getItem(<Link to='/personal/collection'>个人收藏</Link>, 'sub3', <FolderOutlined />,null,null),
    getItem(<Link to='/personal/data'>数据中心</Link>, 'sub4', <BarChartOutlined />,null,null),
];

const PersonalPage=()=>{
    const {currentUser} = useContext(AuthContext)
    return<div className='PersonalPage'>
        <div className='PersonalContent'>
            <div className='PersonalMenu'>
                <div className='MenuTitle'><p>个人中心</p></div>
                <Menu
                    style={{ width: '100%' }}
                    defaultSelectedKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
                <Outlet/>
        </div>
    </div>
}
export default PersonalPage