const express = require("express");
const router = express.Router();
const { getLessonsCollection, getWordsCollection } = require("./db");
// const verifyAdmin = require("./middlewares/verifyToken");
const { ObjectId } = require("mongodb");





router.post("/create-a-word",async (req, res) => {
      const body = req.body;

      const lesson = await getLessonsCollection().findOne({lessonNo: body.lessonNo});
      const lessonId = lesson._id.toString();
      console.log(lessonId);
      const result = await getWordsCollection().insertOne({...body,lessonId});
      res.status(201).send({success: true, message: "Word is Created Successfully", result:result});
});


router.patch("/update/:id",async (req, res) => {
      const body = req.body
      // const {id} = req.body;
      const {id} = req.params;
      console.log("Id from word",id);
      console.log(body);
   
     
      const query = { _id: new ObjectId(id) };
      const result = await getWordsCollection().updateOne(query, {$set:{...body}});
      res.status(201).send({success: true, message: "Word Updated Successfully", result:result});
});


router.delete("/delete/:_id", async (req, res) => {
      const {_id} = req.params;
      const query = { _id: new ObjectId(_id) };
      
      const result = await getWordsCollection().deleteOne(query);
      console.log(result);
      res.send({success: true, message: "Successfully deleted"});
});



router.get("/all", async (req, res) => {
  try {

    
   
    const words = await getWordsCollection().find().toArray();

    res.status(200).json({success:true, message: "Successfully retrieved vocabulary", result: words});
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});










module.exports = router;
