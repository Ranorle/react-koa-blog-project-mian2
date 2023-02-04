import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios  from "axios";
import {Empty, Tag, Card, Checkbox, Row, Col, Divider} from "antd"
import dayjs from "dayjs";
import { Pagination } from 'tdesign-react';
import 'tdesign-react/es/style/index.css';
import {httpInfo} from "../context/https";
import ReactLive2d from "react-live2d";
const Home =()=>{
    let f=[]
    const [posts,setPosts] = useState([])
    const cat = useLocation().search
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                let res
                if(cat) res=await axios.get(httpInfo+`/posts${cat}`)
                if(!cat) res=await axios.get(httpInfo+`/posts?cat=blogs`)
                let x=res.data
                let y=[]
                x.map((e)=>{
                    y.push(...e.tags.split(','))
                })
                y=(Array.from(new Set(y)))
                setCheckedList(y)
                setPosts(res.data)
                setCheckAll(true)
            }catch(err){
                console.log(err)
            }
            // console.log(f)
            // setCheckedList(f)
        }
        fetchData()
    },[cat])
    const [page,setPage]=useState(1)
    posts.map((post)=>{
        if(post.tags) f.push(...post.tags.split(','))
    })
    f=(Array.from(new Set(f)))
    //
    //处理多选框
    const checkboxs =()=>{
        let i=0
        return f.map((prop)=>{
            i++
            return<Col key={i}>
                <Checkbox defaultChecked={true} key={i} value={prop} >{prop}</Checkbox>
            </Col>
        })

    }
    let [checkedList, setCheckedList] = useState(f);

    const [checkAll, setCheckAll] = useState(true);
    const onChange = (list) => {
        setCheckedList(list);
        setCheckAll(list.length === f.length);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? f : []);
        setCheckAll(e.target.checked);
    };
    const boxs=checkboxs()
    //处理多选框
    //
    //处理出现html标签的问题
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    //处理出现html标签的问题
    //
    //数据预处理
    let postData1=[]
    let postData2=[]
    function handlePosts(){
        function handlePosts1(){
            for(let i=0;i<posts.length;i++){
                let bool=false
                for(let t=0;t<checkedList.length;t++){
                    if(posts[i].tags.split(',').includes(checkedList[t])){
                        bool=true
                        break
                    }
                }
                if(bool)postData1.push(posts[i])
            }
        }
        handlePosts1()
        // console.log(postData1)
        function handlePosts2(){
            const pageSize=10
            for(let i=page*pageSize-pageSize;(i<page*pageSize && i!==postData1.length);i++) {
                postData2[i]=postData1[i]
            }
        }
        handlePosts2()
    }
    handlePosts()
    //数据预处理

    let Cards= postData2.reverse().map((post)=>{
            let t=[]
            function a(){
                let v=[]
                if(post) v=post.tags.split(',')
                t=v.map((prop)=>{
                    return {name:prop,showClose:false}
                })
            }
            a()
        let tagSd
        let y=0
            if(post.tags && t) tagSd=t.map((prop)=>{
                y++
                return <Tag key={y} color="#ebebeb" closable={false} style={{color:'black',marginLeft:'0px',marginRight:'4.5px'}}>{prop.name}</Tag>
            })
           return<Link key={post.id} className='CardDivs' to={`/post/${post.id}`}>
                <div className='CardImg'>
                    {post.img &&<img className='BlogImg' src={httpInfo+`/${post.img}`} alt={post.img}></img>}
                    {!post.img &&<div className='Empty'><Empty description='' image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
                </div>
                <div className='CardInfo'>
                    <div className='CardTitle'><span>{getText(post.title)}</span></div>
                    <div className='CardInfomin'>
                        <div className='CardComment'>
                            <p className='p1'>{getText(post.introduction)}</p>
                            <p className='p2'><span>作者:{post.username}</span> <span>标签: {tagSd}</span></p>
                        </div>
                        <div className='CardInfodet'>{dayjs(post.date).format("YYYY-MM-DD")}</div>
                    </div>
                </div>
            </Link>
        })



    return<div className='home'>
        <div className='posts'>
            <div className='postsDiv'>{Cards}</div>
            <div className='pageNationDiv'>
                <Pagination  size="medium" total={posts.length}  defaultPageSize={10} showPageSize={false} totalContent={false} onChange={(info)=>{
                setPage(info.current)
                }
                } showJumper />
            </div>
        </div>
        <div className='CheckboxDiv'>
            <Card title="筛 选"  className='CardDiv'>
                <p>按标签</p>
                <Checkbox defaultChecked={false} onChange={onCheckAllChange} checked={checkAll}>
                    全选
                </Checkbox>
                <Checkbox.Group style={{ width: '100%' }} defaultChecked={true} value={checkedList} onChange={onChange}>
                    <Row style={{gap:'10px'}}>
                        {boxs}
                    </Row>
                </Checkbox.Group>
                <Divider/>
                <p>按时间</p>
                <Divider/>
                <p>按作者</p>
            </Card>
        </div>
    </div>
}
export default Home