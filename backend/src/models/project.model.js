import mongoose from 'mongoose';





const projectSchema = new moongoose.Schema({
    name:{
        type: String,
        required: [true, 'project name is required'],
        unique: true,
    }
});