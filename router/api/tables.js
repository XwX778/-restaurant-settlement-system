const express = require("express")
const router = express.Router()
const connectInfo = require("../../config/connectInfo")
const mysql = require('mysql')
const conn = mysql.createConnection(connectInfo)
conn.connect();

router.get("/getAllTables", (req, res) => {
    let sqlStr = "select * from tables"
    conn.query(sqlStr, (err, data) => {
        res.json(data)
    })
})
// 获取对应桌子号数据表的信息
router.get('/getTableByNo', (req, res) => {
    let id = req.query.id
    let sql = 'select * from tables where id=' + id
    conn.query(sql, (err, result) => {
        if (err) {
            result = {
                warn: 'error',
                message: '查询失败'
            }
            res.json(result)
        } else {
            res.json(result)

        }
    })
})
// 更新桌号对应数据表的信息
router.patch('/updateTable', (req, res) => {
    let { total, id, list, todayTotal } = req.body.query
    let sql = ""
    if (list == "null") {
        sql = `UPDATE tables SET total=${total},list=NULL,todayTotal=${todayTotal} WHERE id= ${id}`
    } else {
        sql = `UPDATE tables SET total=${total},list='${list}',todayTotal=${todayTotal} WHERE id= ${id}`
    }
    conn.query(sql, (err, result) => {
        if (err) {
            result = {
                warn: 'error',
                message: '更新失败'
            }
            res.status(300).json(result)
        } else {
            res.json(result)
        }
    })
})
module.exports = router