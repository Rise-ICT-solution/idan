const managerResponseSchema = require("../Model/managerResponseSchema")


const response = async (req, res) => {
    const newStatus =  managerResponseSchema(req.body)
    const saveStatus = await newStatus.save()
    if (saveStatus){
        res.send("Resposne status send successfully")
    }
}

const UpdateStatus = async (req, res) => {
    const {status}  = req.body //should be approved or rejected
    const StatusUpdate = await managerResponseSchema.findByIdAndUpdate(req.params.ID)
    if (StatusUpdate){
        StatusUpdate.status = req.body.status
        await StatusUpdate.save()
        res.send("Status has been updated successfully")
    }
    else {
        res.send("Status not updated")
    }
}


module.exports = {response,UpdateStatus}

