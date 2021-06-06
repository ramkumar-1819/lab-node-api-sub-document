const express=require('express');
const ObjectId=require('mongoose').Types.ObjectId;
//creating a routing middleware
const router=express.Router();
//Exporting a module
const {Squad}=require('../Model/Squad');
const {Lesson}=require('../Model/Lesson');
//CRUD operations
//Posting a Squad Details
router.post('/squads',(req,res)=>{
    const newSquad=new Squad(req.body)
    newSquad.save((err,docs)=>{
        if(err){
            res.status(500).send({error:"Squad Details Cannot be Posted"})
        }
        res.send(docs)
    })
})
//fetching the lesson details
router.get('/squads',(req,res)=>{
    Squad.find((err,docs)=>{
        if(err){
            res.status(500).send({error:"Squad Details Cannot be fetched"})
        }
        res.send(docs)
    })
})
//fetching the particular lesson details by using id
router.get('/squads/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Squad.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Squad Details for this id canoot be fetched"})
        }
        res.send(docs)
    })
})
//Updating a lesson detail
router.put('/squads/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    const updatedSquad=req.body;
    Squad.findByIdAndUpdate(req.params.id,{$set:updatedSquad},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({error:"Squad Details for this id canoot be Updated"})
        }
        res.send(docs)
    })
})
//Deleting the resource
router.delete('/squads/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({error:"Invalid Id"})
    }
    Squad.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Squad Details cannot be deleted"})
        }
        res.send(docs)
    })
})
//pushing lesson document in squad document
router.post('/map/:id/:name',(req,res)=>{
    let newLesson,newSquad;
    Lesson.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({error:"Something went wrong"})
        }
        newLesson=new Lesson(docs)
    })
    Squad.findOne({name:req.params.name},(err,docs)=>{
        newSquad=new Squad(docs);
        newSquad.lessonId.push(newLesson)
        newSquad.save((err,docs)=>{
            if(err){
                res.status(500).send({error:"Something went wrong"})
            }
            res.send(docs)
        })
    })
})
//populate() to get view nested documents
router.get('/view',(req,res)=>{
    Squad.find({}).populate('lessonId').exec((err,docs)=>{
        if(err){
            res.status(500).send({error:"Something went wrong"})
        }
        res.send(docs)
    })
})
module.exports=router;
