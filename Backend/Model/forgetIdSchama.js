const mongoose =  require('mongoose')

const userForgetPassword = mongoose.Schema({
    workerId:{
        type: String,
        required: true
    }
})

const userForget = mongoose.model('userForget', userForgetPassword)

module.exports = userForget