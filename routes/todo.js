const express = require('express')
const router = express.Router()
const db = require('../services/db')
const {ObjectId} = require('mongodb')

db.connectToDB((err) => {

    if(err) console.log(err);

    const checkBody = ((req,res,next) => {
        if("_id" in req.body){
            req.body._id = ObjectId(req.body._id)
        }
        next()
    } )

    router.get("/list", async (req,res) => {

        const results = await db.findDocuments()

        res.send(results)
    });
    
    router.post("/add", async (req,res) => {
        const results = await db.insertDocuments(req.body)
        res.send(results)
    });
    
    router.patch("/update", checkBody, async (req,res) => {
        const results = await db.updateDocument(req.body)
        res.send(results)
    });
    
    router.delete("/delete", checkBody, async (req,res) => {
        const result = await db.removeDocument(req.body)
        res.send(result)
    });
})

module.exports = router