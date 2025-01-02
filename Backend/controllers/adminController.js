const AdminSchema = require("../Model/adminSchema")
// create admin
const adminCreate = async (req, res)=>{
    const newAdmin =  AdminSchema(req.body)
    const saveAdmin = await newAdmin.save()
    if (saveAdmin){
        res.send("Admin has created successfully")
    }
}

//get all admins

const getAllAdmins = async (req, res)=>{
    const AllAdmins = await AdminSchema.find()
    res.send(AllAdmins)
}

// getSingle Admin
const getSingleAdmin = async (req, res)=>{
    const SingleAdmin = await AdminSchema.findOne({_id: req.params.id})
    if (SingleAdmin){
        res.send(SingleAdmin)
    }
}

//updateAdmin

const updateAdmin = async (req, res)=>{
    const AdminUpdate = await AdminSchema.updateOne({_id:req.params.id},
        {
            $set:{
                name: req.body.name, //name ka hore waa from the schema
                id: req.body.id,
                title: req.body.title,
                email: req.body.email,
                telephone: req.body.telephone,
                password: req.body.password,
            }
        }
    )
    if (AdminUpdate){
        res.send("Admin has updated successfully")
    }
}

//DeleteAdmin

const deleteAdmin = async (req, res)=>{
    const AdminDelete = await AdminSchema.deleteOne({_id: req.params.id})
    if (AdminDelete){
        res.send("Admin has deleted successfully")
    }
}

// adminLogin

const adminLogin = async (req, res)=>{
    if (req.body.id && req.body.password) {
        const admin  = await AdminSchema.findOne(req.body)
        if (admin){
            res.send ({success: "Admin has been login successfully", admin})
        }
        else {
            res.send ({error: "Incorrect id or password"})
        }
    }
    else {
        res.send ({empty: "ID and Password are required"})
    }
}

module.exports = {adminCreate,getAllAdmins,getSingleAdmin,updateAdmin,deleteAdmin,adminLogin}