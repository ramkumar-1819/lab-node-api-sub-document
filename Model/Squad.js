const mongoose=require('mongoose'),Schema=mongoose.Schema;
//Defining the Schema
const squadDetails=new Schema({
    name:String,
    lessonId:[{type:Schema.Types.ObjectId,ref:'Lesson'}],
    cohort:String
})
//Creating a model
const Squad=mongoose.model("Squad",squadDetails);
module.exports={Squad};