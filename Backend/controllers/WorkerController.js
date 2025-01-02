const WorkerSchema = require("../Model/WorkerSchema")
const nodemailer = require("nodemailer")

const workerCreate = async (req, res) => {
    const newWorker = WorkerSchema(req.body)
    const saveWorker = await newWorker.save()
    if (saveWorker){
        res.send("Worker has Added successfully")
    }
};


const workerGettAll = async (req, res) => {
    const Allworkers = await WorkerSchema.find()
    res.send(Allworkers)
}


//an API that updates Workers data 
const workerUpdate = async (req, res) => {
    const updateWorker = await WorkerSchema.updateOne({_id: req.params.id},
        {
            $set:{
                name: req.body.name,
                id: req.body.id,
                title: req.body.title,
                email: req.body.email,
                telephone: req.body.telephone,
                password: req.body.password
            }
        }
    )
    if (updateWorker){
        res.send("Worker Has been updated successfully")
    }
}

//an API that deletes Workers data
const workerdelete = async (req, res) => {
    const deleteWorker = await WorkerSchema.deleteOne({_id: req.params.id})
    if (deleteWorker){
        res.send("Worker has been deleted successfully ")
    }
}


// API to login a worker in the worker login page 
const workerLogin =  async (req, res) => {
    if (req.body.id && req.body.password){
        const worker  = await WorkerSchema.findOne(req.body).select("-password -email -telephone ")
        if (worker){
            res.send({success: "Worker has been logged in successfully", worker})
        }
        else {
            res.send({error: " Incorrect ID or Password", worker})
        }
        
        }
        else {
            res.send({empty: "Worker ID and Password are required "})
        }
    
}

// API to get all requests for a specific worker
const SingleWorker = async (req, res) => {
    const GetSingleWorker = await WorkerSchema.findOne({_id: req.params.id})
    if (GetSingleWorker){
        res.send(GetSingleWorker)
    }
}

//Worker Password Recovery 
const PasswordRecovery = async (req, res) => {
    const CheckWorkerID = await WorkerSchema.findOne({id: req.body.id})
    if (!CheckWorkerID){
        res.send("No worker found with this ID")
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            email: "bakaryare2003@gmail.com",
            password: "2162"
        }
    })
     const mailOptions = {
        from: "bakaryare2003@gmail.com",
        to: CheckWorkerID.email,
        subject: "Password Recovery",
        text: `Your password is: ${CheckWorkerID.password}`
     }
     transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            res.send("Error for sending email")
            console.log(error)
        } else {
            console.log("Email sent: " + info.response)
            res.send("Password has sent to your email")
        }
     })
}


module.exports = {workerCreate,workerGettAll,workerUpdate,workerdelete,workerLogin,SingleWorker, PasswordRecovery}
