const express = require('express')
const router = require("express").Router();
const { MongoClient, ObjectID } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
// const authorize = require("../auth/authorize");


const dbUrl = process.env.DB_URL;
const app = express()
app.use(cors({
    origin : "*",
    credentials : true
}));

// create invoice

router.post('/createinvoice', async (req, res) => {

    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db("LearnQ-Invoice");
        let invoice = await db.collection("invoice").findOne({ invoiceNumber : req.body.invoiceNumber });
        if (!invoice) {
        await db.collection("invoice").insertOne(
        {   invoiceNumber : req.body.invoiceNumber,
            tutorFName : req.body.tutorFName,
            tutorLName : req.body.tutorLName,
            tutorEmail : req.body.tutorEmail,
            studentFName : req.body.studentFName,
            studentLName : req.body.studentLName,
            studentEmail : req.body.studentEmail,
            classTitle : req.body.classTitle,
            startTime : req.body.startTime,
            endTime : req.body.endTime,
            feePerHour : req.body.feePerHour,
            discount : req.body.discount,
            createdOn : req.body.createdOn
        });

            res.status("200").json({ message: "Invoice Created" })
    } else {
    res.status(404).json(
        {
      message: "Invoice Number Exists. Try with new invoice number",
    });
}
        client.close();
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

// find unique invoice

router.get('/findinvoice', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db("LearnQ-Invoice");
        let data = await db.collection("invoice").findOne({invoiceNumber : req.body.invoiceNumber});
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No Data Found" })
        }
        client.close();
    } catch (error) {
        console.log(error)
        res.status(500)
    }

})

// // total number of urls created between selected date

router.get('/createdbetween', async(req,res)=>{
    try {
        let client = await MongoClient.connect(dbUrl);
        let db = client.db('LearnQ-Invoice');
        let data = await db.collection("invoice").find({createdOn:{$gte:(req.body.startDate) ,$lte:(req.body.endDate)}}).toArray();
        if(data)
        {
            res.status(200).json(data);
        }else {
            res.status(404).json({ message: "No Invoices created between selected dates" })
        }
        client.close();
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})





module.exports = router;