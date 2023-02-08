import React, {useContext, useState} from "react";
import {AuthContext} from "../context/authContext";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Modal, Divider, Form, Input,message,Watermark } from "antd";


const UserInfo=()=>{
    let {currentUser,changeinfo,changepassword} =useContext(AuthContext)
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
                            message: '请输入邮箱!',
                        },
                        {
                            type: 'email',
                            message: '必须是正确的邮箱格式',
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
    const onCreate = () => {
        setOpen(false);
    };
    const CollectionCreateForm2 = ({ open, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                open={open}
                title="更改密码"
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
                            changepassword({values:values, token:token})

                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                            message.error('修改失败，重复密码不一致')
                        });

                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal2"
                    initialValues={{
                        username:currentUser.username,
                        email:currentUser.email,
                        signal:currentUser.signal,
                    }}
                >
                    <Form.Item
                        name="original"
                        label="原密码"
                        rules={[
                            {
                                required:true,
                                message: '请输入原密码!',
                            },
                        ]}

                    >
                        <Input.Password placeholder='请输入原密码'/>
                    </Form.Item>
                    <Form.Item name="new" label="新密码" hasFeedback rules={[
                        {
                            required:true,
                            message: '请输入新密码!',
                        },
                    ]}>
                        <Input.Password placeholder='请输入新密码' />
                    </Form.Item>
                    <Form.Item name="repeat" label="重复新密码" hasFeedback dependencies={['new']} rules={[
                        {
                            required:true,
                            message: '请再次输入新密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不相同！'));
                            },
                        }),
                    ]}

                    >
                        <Input.Password placeholder='请再次输入新密码'  />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const [open2, setOpen2] = useState(false);
    const onCreate2 = () => {
        setOpen2(false);
    };
    return<div className='PersonalContentInfo'>
        <CollectionCreateForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false);
            }}
        />
        <CollectionCreateForm2
            open={open2}
            onCreate={onCreate2}
            onCancel={() => {
                setOpen2(false);
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
        <Button onClick={()=> {setOpen2(true)}}>更改密码</Button>
    </div>
        </div>
        <Divider type='horizontal'/>
        <div className='theme'>
        <Watermark content={['主题功能', '尽请期待']} gap={[80,80]}>
            <div style={{height: 340}} />
        </Watermark>
        </div>
    </div>
}
export default UserInfo