const express = require("express");
const router = express.Router();
const { getLessonsCollection, getWordsCollection } = require("./db");
const verifyToken = require("./middlewares/verifyToken");
const verifyAdmin = require("./middlewares/verifyAdmin");

const { ObjectId } = require("mongodb");



router.get("/all", verifyToken, async (req, res) => {
  try {
   

    // Fetch all lessons
    const lessons = await getLessonsCollection().find().toArray();

    // Transform each lesson to include vocabularyCount
    const result = await Promise.all(
      lessons.map(async (lesson) => {
        const vocabularyCount = await getWordsCollection().countDocuments({ lessonNo: lesson.lessonNo });
        return {
          _id:lesson._id,
          id: lesson.lessonNo,
          name: lesson.lessonName,
          number: parseInt(lesson.lessonNo, 10),
          vocabularyCount,
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});


router.get("/:_id/words",verifyToken, async (req, res) => {
    try {
      const { _id } = req.params;
    //   const wordsCollection = getWordsCollection();
  
      // Fetch words where lessonNo matches the parameter
      const words = await getWordsCollection().find({ lessonId:_id }).toArray();
  
      if (words.length === 0) {
        return res.status(404).json({ message: "No words found for this lesson" });
      }
  
      res.status(200).json(words);
    } catch (error) {
      console.error("Error fetching words for lesson:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  });


router.post("/create-a-lesson",verifyAdmin,async (req, res) => {
      const body = req.body;
      const existingLesson = await getLessonsCollection().findOne({ lessonNo:body.lessonNo });
      if (existingLesson) {
        return res.status(400).json({ success:false, message: "Lesson Number already exists" });
      }
      const result = await getLessonsCollection().insertOne(body);
      res.status(201).send({success: true, message: "Lesson Create Successfully", result:result});
});


router.patch("/update/:id",verifyAdmin, async (req, res) => {
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


router.delete("/delete/:_id",verifyAdmin, async (req, res) => {
      const {_id} = req.params;
      const query = { _id: new ObjectId(_id) };
      const result =  await getLessonsCollection().deleteOne(query);
      const result2 = await getWordsCollection().deleteMany({lessonId:_id});
      console.log(result, result2);
      res.send({success: true, message: "Successfully deleted"});
});









module.exports = router;
