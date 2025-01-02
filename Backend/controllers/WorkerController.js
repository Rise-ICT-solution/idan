const WorkerSchema = require("../Model/WorkerSchema")


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
        // if (worker){
        //     const workerRequests = await WorkerSchema.find({id: worker.id})
        //     res.send({
        //         worker:{
        //             id:worker.id
        //         }, 
        //         requests: workerRequests
            // })
        }
        else {
            res.send({empty: "Worker ID and Password are required "})
        }
    
}

// API to get all requests for a specific worker
// Worker.post("/worker/PrivateRequests", async (req, res) => {
//     const { id, password } = req.body;

//     if (id && password) {
//         // Authenticate the worker using WorkerSchema
//         const worker = await WorkerSchema.findOne({ id, password }); {/*.select("-password -email -telephone");*/};
//         if (worker) {
//             // Fetch all requests for the logged-in worker using the worker's ID
//             const workerRequests = await WorkerSchema.find({ id: worker.id });

//             if (workerRequests.length > 0) {
//                 res.send({
//                     worker: {
//                         id: worker.id,
//                         fullName: worker.name,
//                         title: worker.title,
//                     },
//                     requests: workerRequests
//                 });
//             } else {
//                 res.send({ message: "No requests found for this worker." });
//             }
//         } else {
//             res.send({ error: "Incorrect ID or Password" });
//         }
//     } else {
//         res.send({ error: "Worker ID and Password are required" });
//     }
// });

const SingleWorker = async (req, res) => {
    const GetSingleWorker = await WorkerSchema.findOne({_id: req.params.id})
    if (GetSingleWorker){
        res.send(GetSingleWorker)
    }
}


module.exports = {workerCreate,workerGettAll,workerUpdate,workerdelete,workerLogin,SingleWorker}
