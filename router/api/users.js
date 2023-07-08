const express = require("express")
const router = express.Router()
const connectInfo = require("../../config/connectInfo")
const mysql = require('mysql')
const conn = mysql.createConnection(connectInfo)
conn.connect();

const jwt = require("jsonwebtoken")
/* router.get("/test", (req, res) => {
    let sqlstr = "select * from users"
    conn.query(sqlstr, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
}) */

router.post("/login", (req, res) => {
    const { user, password } = req.body
    let sqlstr = "select * from users"
    conn.query(sqlstr, (err, result) => {
        if (err) return res.json(err)
        else {
            result.forEach(item => {
                if (item.user !== user) {
                    return res.status(404).json("没有该用户，联系管理员添加用户")
                } else {
                    // 验证密码
                    if (item.password === password) {
                        const rule = { user: item.user }
                        jwt.sign(rule, "great_309", { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                msg: '登录成功',
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                    } else {
                        return res.status(404).json("密码错误")
                    }
                }
            });
        }
    })
})
router.get("/getUserInfo", (req, res) => {
    const headers = req.headers
    const token = headers["authorization"].split(" ")[1]
    jwt.verify(token, "great_309", (err, payLoad) => {
        if (err) res.status(401).json(err)
        res.json(payLoad)
    })

})

module.exports = router