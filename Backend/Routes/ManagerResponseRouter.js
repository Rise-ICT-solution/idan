const express = require("express")
const Response = express.Router()

const {response,UpdateStatus} = require('../controllers/ManagerResponseController')




Response.post("/CreateStatus", response)

Response.put("/UpdateStatus", UpdateStatus)

module.exports = Response