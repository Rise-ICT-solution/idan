const mongoose = require("mongoose")

const WorkerRequest = mongoose.Schema({

    fullName: {
        type: String,
        required: false
    },

    ID: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },

    destination:{
        type: String,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        required: true,
    },
    requestedAt:{
        type: Date,
        default: Date.now
    },
    approvedAt:{
        type: Date,
        default: Date.now
    },
    

})


const RequestSchema = mongoose.model("WorkerRequestSchema", WorkerRequest)
module.exports = RequestSchema