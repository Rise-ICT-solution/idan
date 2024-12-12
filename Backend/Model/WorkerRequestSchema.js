const mongoose = require("mongoose")

const WorkerRequest = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    ID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
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
        default: "pending"
    }

})


const RequestSchema = mongoose.model("WorkerRequestSchema", WorkerRequest)
module.exports = RequestSchema