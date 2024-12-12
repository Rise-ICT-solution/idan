const express = require("express");
const Request = express.Router();
const WorkerRequestSchema = require("../Model/WorkerRequestSchema"); // Worker Request Schema
const WorkerSchema = require("../Model/WorkerSchema"); // Worker Schema for authentication

// Route to create a new request
// Request.post("/request/create", async (req, res) => {
//     try {
//         const { startDate, endDate, fullName, id, title, destination, reason } = req.body;

//         // Ensure both startDate and endDate are provided
//         if (!startDate || !endDate) {
//             return res.send("Start date and end date are required.");
//         }

//         // Calculate the duration in days between startDate and endDate
//         const duration = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

//         // Ensure the duration is non-negative
//         if (duration < 0) {
//             return res.send("End date must be later than start date.");
//         }

//         // Create a new worker request with the calculated duration
//         const newRequest = new WorkerRequestSchema({
//             fullName,
//             id,
//             title,
//             startDate,
//             endDate,
//             duration,
//             destination,
//             reason
//         });

//         const saveRequest = await newRequest.save();
//         res.send("Request has been sent successfully");

//     } catch (error) {
//         res.send("Error processing request: " + error.message);
//     }
// });

// Creating request from employees
Request.post("/new/request", async (req, res) => {
    const newRequest = WorkerRequestSchema(req.body)
    const saveRequest = await newRequest.save()
    if(saveRequest){
        res.send({
            massage: "Request has been saved",
            data: saveRequest
        })
    }
    else {
        res.send({
            error: "Request has not saved"
        })
    }
})

// Waa meesha laga go'aan loogu gaaraayaao qofka fasax rabo
Request.put("/update/status/:id", async (req, res) => {
    const status = await WorkerRequestSchema.updateOne(
        {_id: req.params.id},
        { status: req.body.status })

        if(status){
            res.send({
                massage: "Status has been updated",
                data: status
            })
        }
})


Request.get("/requests/read", async (req, res) => {
    const allRequests = await WorkerRequestSchema.find();
    res.send(allRequests);
});

// Soo bandhig xogta user uu leeyahay kaliye

// Route to get a single request by its ID
Request.get("/request/SingleRead/:id", async (req, res) => {
    const singleRequest = await WorkerRequestSchema.find({ ID: req.params.id });
    if (singleRequest) {
        res.send(singleRequest);
    } else {
        res.send("Request not found.");
    }
});

// Route to delete a request by its ID
Request.delete("/request/delete/:id", async (req, res) => {
    const deleteRequest = await WorkerRequestSchema.deleteOne({ _id: req.params.id });
    if (deleteRequest.deletedCount > 0) {
        res.send("Request has been deleted successfully");
    } else {
        res.send("Request not found.");
    }
});

module.exports = Request;
