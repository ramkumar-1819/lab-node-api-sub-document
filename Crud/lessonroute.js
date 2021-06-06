const express=require('express');
const ObjectId=require('mongoose').Types.ObjectId;
//creating a routing middleware
const router=express.Router();
//Exporting a module
const {Lesson}=require('../Model/Lesson');
//CRUD operations
//Posting a lesson Details
router.post('/lessons',(req,res)=>{
    const newLesson=new Lesson(req.body)
    newLesson.save((err,docs)=>{
        if(err){
            res.status(500).send({error:"Lesson Details Cannot be Posted"})
        }
        res.send(docs)
    })
})
//fetching the lesson details
router.get('/lessons',(req,res)=>{
    Lesson.find((err,docs)=>{
        if(err){
            res.status(500).send({error:"Lesson Details Cannot be fetched"})
        }
        res.send(docs)
    })
})
//fetching the particular lesson details by using id
router.get('/lessons/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Lesson.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Lesson Details for this id canoot be fetched"})
        }
        res.send(docs)
    })
})
//Updating a lesson detail
router.put('/lessons/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    const updatedLesson=req.body;
    Lesson.findByIdAndUpdate(req.params.id,{$set:updatedLesson},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({error:"Lesson Details for this id canoot be Updated"})
        }
        res.send(docs)
    })
})
//Deleting the resource
router.delete('/lessons/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Lesson.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Lesson Details cannot be deleted"})
        }
        res.send(docs)
    })
})
module.exports=router;