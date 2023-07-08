const express = require("express")
const router = express.Router()
const connectInfo = require("../../config/connectInfo")
const mysql = require('mysql')
const conn = mysql.createConnection(connectInfo)
conn.connect();

router.get("/getAllFoods", (req, res) => {
    console.log(req.user);
    let sqlStr = "select * from foods"
    conn.query(sqlStr, (err, data) => {
        if (err) res.status(403).json(err)
        res.json(data)
    })
})

module.exports = router