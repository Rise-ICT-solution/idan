const express = require('express');

const Admin = express.Router();
const {adminCreate,getAllAdmins,getSingleAdmin,updateAdmin,deleteAdmin,adminLogin } = require("../controllers/adminController")

// admin create
Admin.post("/admin/create", adminCreate)

//admin getAll
Admin.get("/Admin/read", getAllAdmins )

Admin.get("/Admin/SingleAdmin/:id", getSingleAdmin)

Admin.put("/Admin/update/:id", updateAdmin)

Admin.delete("/admin/delete/:id", deleteAdmin)




//An API that get the ID and Password of the Admin

Admin.post("/admin/login", adminLogin)
module.exports = Admin