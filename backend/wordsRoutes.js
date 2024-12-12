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
      console.log(id);
      // console.log(body);
      const existingLesson = await getLessonsCollection().findOne({ lessonNo:body.lessonNo });
      if (existingLesson) {
        return res.status(400).json({ success:false, message: "Lesson Number already exists" });
      }
      const query = { _id: new ObjectId(id) };
      const result = await getLessonsCollection().updateOne(query, {$set:{lessonName:req.body.lessonName, lessonNo:req.lessonNo}});
      res.status(201).send({success: true, message: "Lesson Updated Successfully", result:result});
});


router.delete("/delete/:_id", async (req, res) => {
      const {_id} = req.params;
      const query = { _id: new ObjectId(_id) };
      const result =  await getLessonsCollection().deleteOne(query);
      const result2 = await getWordsCollection().deleteMany({lessonId:_id});
      console.log(result, result2);
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
