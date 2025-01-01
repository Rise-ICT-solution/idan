const WorkerRequestSchema = require("../Model/WorkerRequestSchema")


// Creating request from employees
const newRequest = async (req, res) => {
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
}

// Waa meesha laga go'aan loogu gaaraayaao qofka fasax rabo
const updateStatus = async (req, res) => {
    const status = await WorkerRequestSchema.updateOne(
        {_id: req.params.ID},
        {status: req.body.status})
        if(status){
            res.send({
                message: "Status has been updated",
                data: status
            })
        }
}





const requestsRead =  async (req, res) => {
    const allRequests = await WorkerRequestSchema.find();
    res.send(allRequests);
};

//an API that makes total count 

const requestsCount = async (req,res) => {
    const requestsCount = await WorkerRequestSchema.countDocuments()
    res.send({requestsCount})
}

// Soo bandhig xogta user uu leeyahay kaliye

// Route to get a single request by its ID
const RequestSingleRead =  async (req, res) => {
    const singleRequest = await WorkerRequestSchema.find({ID: req.params.ID });
    if (singleRequest) {
        res.send(singleRequest);
    } else {
        res.send("Request not found.");
    }
};

//Route in the WorkerViewBox 
const RequestID =  async (req, res) => {
    const singleRequest = await WorkerRequestSchema.findOne({ _id: req.params.id });
    if (singleRequest) {
        res.send(singleRequest);
    } else {
        res.send("Request not found.");
    }
};

// Route to delete a request by its ID
const RequestDelete =  async (req, res) => {
    const deleteRequest = await WorkerRequestSchema.deleteOne({_id: req.params.id});
    if (deleteRequest) {
        res.send("Request has been deleted successfully");
    } else {
        res.send("Request not found.");
    }
};


module.exports = {newRequest,updateStatus,requestsRead,requestsCount,RequestSingleRead,RequestID,RequestDelete}
