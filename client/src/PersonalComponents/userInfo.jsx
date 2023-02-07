import React, {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Modal, Divider, Form, Input,message} from "antd";
import axios from "axios";
import {httpInfo} from "../context/https";

const UserInfo=()=>{
    let {currentUser,changeinfo} =useContext(AuthContext)
    console.log(currentUser)
    const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                open={open}
                title="更改个人信息"
                okText="确认修改"
                cancelText="取消"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then(async (values) => {
                            form.resetFields();
                            onCreate(values);
                            const token=JSON.parse(sessionStorage.getItem('user')).token
                            changeinfo({
                                values:values,
                                token:token,
                            })

                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                            message.error('修改失败')
                        });
                    message.success('修改成功！')
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        username:currentUser.username,
                        email:currentUser.email,
                        signal:currentUser.signal,
                    }}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required:true,
                                message: '请输入用户名!',
                            },
                        ]}

                    >
                       <Input defaultValue={currentUser.username} placeholder='请输入用户名'/>
                    </Form.Item>
                    <Form.Item name="signal" label="签名" >
                        <Input placeholder='请输入个人签名' defaultValue={currentUser.signal}/>
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[
                        {
                            required:true,
                            message: '请输入用户名!',
                        },
                    ]}

                    >
                        <Input placeholder='请输入邮箱' defaultValue={currentUser.email} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const [open, setOpen] = useState(false);
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpen(false);
    };

    return<div className='PersonalContentInfo'>
        <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false);
            }}
        />
        <div className='usercuurentinfo'>
        <div className='baseInfo'>
        <Avatar size={64} icon={<UserOutlined />} src={currentUser.img} />
            <div className='baseInfotext'>
                <h3>{currentUser.username}</h3>
                <p>个性签名:{currentUser.signal}</p>
            </div>
    </div>
        <div className='changeDiv'>
        <Button onClick={() => {setOpen(true);}}>更改资料</Button>
        <Button>更改密码</Button>
    </div>
        </div>
        <Divider type='horizontal'/>
    </div>
}
export default UserInfo