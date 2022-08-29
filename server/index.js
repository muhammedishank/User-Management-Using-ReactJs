const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const app = express()
const authRoutes = require("./Routes/AuthRoutes")
const port = process.env.PORT || 5000;

const url = "mongodb://localhost:27017/testdb"
mongoose.connect(url,{}).then((res)=>console.log("<<<<<<<<MONGOOS connected")).catch((err)=>console.log(err))
// mongoose.connect("mongodb://localhost:27017/testdb", {
//   useNewUrlParser: "true",
// })
// mongoose.connection.on("error", err => {
//   console.log("err", err)
// })
// mongoose.connection.on("connected", (err, res) => {
//   console.log("mongoose is connected")
// })

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method:["GET","POST"],
        credentials:true,
    })
)

app.use(cookieParser())
app.use(express.json())
app.listen(port, ()=> console.log("server STARTED"))
app.use("/",authRoutes)

