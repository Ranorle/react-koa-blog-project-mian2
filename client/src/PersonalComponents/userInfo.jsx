import React, {useContext} from "react";
import {AuthContext} from "../context/authContext";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";
const UserInfo=()=>{
    let {currentUser} =useContext(AuthContext)
    return<div className='PersonalContentInfo'>
        <div className='baseInfo'>
        <Avatar size={64} icon={<UserOutlined />} src={currentUser.img} />
            <div className='baseInfotext'>
                <h3>{currentUser.username}</h3>
                <p>个性签名:{currentUser.signal}</p>
            </div>
    </div>
        <div className='changeDiv'>
        <Button>更改资料</Button>
        <Button>更改密码</Button>
    </div>
    </div>
}
export default UserInfo