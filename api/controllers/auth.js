import {db} from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const register=(req,res)=>{
//check existing user
    const q ="SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q,[req.body.email,req.body.name],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("与用户已经存在!")
        //哈希加密密码
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt);

        const q="INSERT INTO users(`username`,`email`,`password`,`collection`) VALUES (?)"
        const values =[
            req.body.username,
            req.body.email,
            hash,
            -1,
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return  res.status(200).json("User has been created.")
        })

    })
}
export const login=(req,res)=>{
//检查是否存在用户
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length ===0) return res.status(404).json("未找到用户")
        //检查密码
        const isPasswordCorrect=bcrypt.compareSync(req.body.password,data[0].password)
        if(!isPasswordCorrect) return res.status(400).json("密码错误或用户名不正确")

    const token=jwt.sign({id:data[0].id},"jwtkey")
    const {password,...other} =data[0] //过滤数据库密码c
        other.token=token
        console.log(other)
        res.status(200).json(other)
    })

}
export const logout=(req,res)=>{
res
    // .clearCookie("access_token",{
    // sameSite:"none",
    //     secure:true
    // })
    .status(200).json("用户注销成功")

}