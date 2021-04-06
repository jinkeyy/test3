const mogoose = require("mongoose")
const jobSchema = mogoose.Schema({
    title: {required: true,type: String},
    content: {required: true,type: String},
    progress: {required: true, type: String},
    user:[{required: false,type: String}]
})
module.exports = mogoose.model("job",jobSchema)