const express = require("express")
const Worker = express.Router();
 const {workerCreate,workerGettAll,workerUpdate,workerdelete,workerLogin,SingleWorker,PasswordRecovery} = require("../controllers/WorkerController")


Worker.post("/worker/create", workerCreate);


Worker.get("/worker/read", workerGettAll)

//an API that updates Workers data 
Worker.put("/worker/update/:id", workerUpdate)

//an API that deletes Workers data
Worker.delete("/worker/delete/:id", workerdelete)


// API to login a worker in the worker login page 
Worker.post("/worker/login", workerLogin)

// API to get all requests for a specific worker
Worker.get("/SingleWorker/:id", SingleWorker)

//API that handles password reset request
Worker.post("/resetPassword", PasswordRecovery)




module.exports = Worker