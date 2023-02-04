import React, {useContext, useEffect, useState} from "react";
import {DeleteOutlined,EditOutlined} from "@ant-design/icons";
import {Button,Tag,Divider,FloatButton,Affix} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext";
import DOMPurify from "dompurify";
import ReactMarkdown from 'react-markdown';
import MarkNav from 'markdown-navbar';
import remarkGfm from "remark-gfm";
import 'github-markdown-css'
import 'markdown-navbar/dist/navbar.css';
import {httpInfo} from "../context/https";
const Single =()=>{
    const [post,setPost] = useState({tags:''})

    const location = useLocation()

    const navigate=useNavigate()

    const postId =location.pathname.split("/")[2]

    let {currentUser} =useContext(AuthContext)
    if(currentUser===null) currentUser={ //为解决currentUser不存在会导致single页面无法显示的bug
        "id": 0,
        "username": "",
        "email": "",
        "img": ""
    }

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await axios.get(httpInfo+`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData()
    },[postId])

    const handleDelete=async ()=>{
        try{
            const token=JSON.parse(sessionStorage.getItem('user')).token
            await axios.delete(httpInfo+`/posts/${postId}`,{data:{token:token}})
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }



    const tagsDiv=post.tags.split(',').map((prop)=>{
        return<Tag key={prop} color="#ebebeb" closable={false} style={{minWidth:'30px',color:'black',marginLeft:'4.5px',marginRight:'4.5px'}}>{prop}</Tag>
    })

    return<div className='single'>
        <div className='singlecontent'>
            <img src={httpInfo+`/${post?.img}`}/>
            <div className='titled'>
            <h1 className='hh' dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.title),
            }}
            ></h1></div>
            <div className='user'>
                {post.userImg &&<img src={post.userImg}/>}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
                { currentUser.username=== post.username &&
                    <div className="edit">
                    <Link to={`/write?edit=2`} state={post}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} size='large' ghost/>
                    </Link>
                        <Button onClick={handleDelete} type="primary" shape="circle" icon={<DeleteOutlined />} size='large' ghost/>
                </div>
                }
        </div>
            <div className='introAndTags'>
                {post.tags && <div><span className='tagSpan'>标签:</span> {tagsDiv}</div>}
            <span className='introSpan'>简介:<span className='y'>{post.introduction}</span></span>
            </div>
            <Divider/>
            <div className='markdown-body'>
            <ReactMarkdown  className='MarkdownContent' remarkPlugins={[remarkGfm]} children={post.desc}/>
                </div>
        </div>
        <div className='rightdiv'>
            <Affix >
        <div className="nav-container">
            <MarkNav className="article-menu" updateHashAuto={true}  source={post.desc} headingTopOffset={80} ordered={false} />
        </div>
            </Affix>
        {/*<Menu cat={post.cat}/>*/}
            </div>
        <FloatButton.BackTop />
    </div>
}
export default Single