const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
app.use(cors())

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/iDaan").then (() => {
    console.log("Database Connected to MongoDB")
}).catch((error) => {
    console.log(error)
})


const adminRoute = require("./Routes/AdminRouter")
const workerRoute = require("./Routes/WorkerRouter")
const requestRoute = require("./Routes/WorkerRequestRouter")
const MananagerResponse = require("./Routes/ManagerResponseRouter")
// const PasswordRecovery = require("./Routes/")



app.use(adminRoute)
app.use(workerRoute)
app.use(requestRoute)
app.use(MananagerResponse)
// app.use(userForgetPasword)


app.listen(7000, () => {
    console.log("Server is running on port 7000")
})