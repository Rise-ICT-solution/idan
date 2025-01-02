const express = require("express");
const Request = express.Router();
const WorkerRequestSchema = require("../Model/WorkerRequestSchema"); // Worker Request Schema
const WorkerSchema = require("../Model/WorkerSchema"); // Worker Schema for authentication

const  {newRequest,updateStatus,requestsRead,requestsCount,RequestSingleRead,RequestID,RequestDelete} = require('../controllers/WorkerRequestController')

// Creating request from employees
Request.post("/new/request", newRequest)

// Waa meesha laga go'aan loogu gaaraayaao qofka fasax rabo
Request.put("/update/status/:ID", updateStatus)


Request.get("/requests/read", requestsRead);

//an API that makes total count 

Request.get("/requests/count", requestsCount)

// Soo bandhig xogta user uu leeyahay kaliye

// Route to get a single request by its ID
Request.get("/request/SingleRead/:ID", RequestSingleRead);

//Route in the WorkerViewBox 
Request.get("/request/:id", RequestID);

// Route to delete a request by its ID
Request.delete("/requests/delete/:id", RequestDelete);


// router.delete("/delete/product/:id" , async(req, res)=>{
//     const deleteProduct = await productModel.deleteOne({_id: req.params.id})
//     if (deleteProduct){
//         res.send("Product has been deleted successfully")
//     }
// })

module.exports = Request;
