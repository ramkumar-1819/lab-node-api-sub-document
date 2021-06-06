const mongoose=require('mongoose'),Schema=mongoose.Schema;
//Defining the Schema
const lessonDetails=new Schema({
    name:String,
})
//Creating a model
const Lesson=mongoose.model("Lesson",lessonDetails);
module.exports={Lesson};