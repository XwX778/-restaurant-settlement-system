const express = require("express")
const app = express()
const users = require("./router/api/users")
const bodyParser = require("body-parser")
const tables = require("./router/api/tables")
const foods = require("./router/api/foods")

// 使用body-parser中间件
/* 当extended为false的时候，键值对中的值就为'String'或'Array'形式，
    当extended为true的时候，则可为任何数据类型。 */
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", users)
app.use("/api/tables", tables)
app.use("/api/foods", foods)

app.listen("5000", () => {
    console.log("5000服务启动");
})