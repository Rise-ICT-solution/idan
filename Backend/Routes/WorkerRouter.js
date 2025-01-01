const express = require("express")
const Worker = express.Router();
 const {workerCreate,workerGettAll,workerUpdate,workerdelete,workerLogin,SingleWorker} = require("../controllers/WorkerController")


Worker.post("/worker/create", workerCreate);


Worker.get("/worker/read", workerGettAll)

//Get Single Workers AutoData 
// Worker.get("/worker/AutoData/:id", async (req, res) => {
//     // const WorkerID = req.user.id;
//     const SingleWorker = await WorkerSchema.findOne({_id: req.params.id}).select("-password -email -telephone ")
//     if (SingleWorker){
//         res.send(SingleWorker)
//     }

// })

//an API that updates Workers data 
Worker.put("/worker/update/:id", workerUpdate)

//an API that deletes Workers data
Worker.delete("/worker/delete/:id", workerdelete)


// API to login a worker in the worker login page 
Worker.post("/worker/login", workerLogin)

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

Worker.get("/SingleWorker/:id", SingleWorker)



module.exports = Worker