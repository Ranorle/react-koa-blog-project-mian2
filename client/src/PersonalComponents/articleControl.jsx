import React from "react";
import {CheckSquareOutlined, FormOutlined,} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
const items = [
    {
        label: '已发布',
        key: 'mail',
        icon: <CheckSquareOutlined />,
    },
    {
        label: '草稿',
        key: 'app',
        icon: <FormOutlined />
    },
];
const ArticleControl=()=>{
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        setCurrent(e.key);
    };

    return<div className='PersonalContentInfo'>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
}
export default ArticleControl