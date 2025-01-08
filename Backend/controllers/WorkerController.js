const WorkerSchema = require("../Model/WorkerSchema")
// const nodemailer = require("nodemailer")

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
      
    
}

// API to get all requests for a specific worker
const SingleWorker = async (req, res) => {
    const GetSingleWorker = await WorkerSchema.findOne({_id: req.params.id})
    if (GetSingleWorker){
        res.send(GetSingleWorker)
    }
}

//Worker Password Recovery 
// const PasswordRecovery = async (req, res) => {
//     console.log('EMAIL_USER:', process.env.EMAIL_USER);
//     console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
//     const workerID = req.body.id;
    
//     // Validate worker ID
//     if (!workerID) {
//         return res.send( "Worker ID is required");
//     }

//     // Check if worker with the given ID exists
//     const worker = await WorkerSchema.findOne({ id: workerID });
//     if (!worker) {
//         return res.send("No worker found with this ID");
//     }
//   // Log email credentials
//     // Setup Nodemailer transporter with environment variables
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_USER, // Use environment variables for credentials
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     // Email options
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: worker.email,
//         subject: "Password Recovery",
//         text: `Your password is: ${worker.password}` // Be cautious with sending passwords directly
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error("Error sending email:", error);
//             return res.status(500).json({ error: "Error sending email" });
//         }
//         console.log("Email sent: " + info.response);
//         res.status(200).json({ message: "Password has been sent to your email" });
//     });
// };


module.exports = {workerCreate,workerGettAll,workerUpdate,workerdelete,workerLogin,SingleWorker}
// PasswordRecovery

