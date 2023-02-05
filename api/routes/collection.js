import express from "express";
import {db} from "../db.js";
const router =express.Router()
router.post('/',(req,res)=>{
    const q="UPDATE users SET `collection`=? WHERE `id` = ?";
    db.query(q, [req.body.x,req.body.currentUser.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("收藏成功");
    });

})
export default router