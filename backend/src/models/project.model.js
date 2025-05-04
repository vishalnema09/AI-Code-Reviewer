import mongoose from 'mongoose';





const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'project name is required'],
        unique: true,
    },
    code:{
        type: String,
        default: "",
    },
    review:{
        type: String,
        default: "",
    }
});

const projectModel = mongoose.model('Project', projectSchema);
export default projectModel;