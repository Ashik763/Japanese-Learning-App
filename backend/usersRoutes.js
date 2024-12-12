const express = require("express");
const router = express.Router();
const { getUsersCollection } = require("./db");
// const verifyAdmin = require("./middlewares/verifyToken");
const { ObjectId } = require("mongodb");



router.patch("/update/:id",async (req, res) => {
      const body = req.body
      // const {id} = req.body;
      const {id} = req.params;
      console.log("Id from word",id);
      console.log(body);
   
     
      const query = { _id: new ObjectId(id) };
      const result = await getUsersCollection().updateOne(query, {$set:{...body}});
      res.status(201).send({success: true, message: "Role Updated Successfully", result:result});
});





router.get("/all", async (req, res) => {
  try {

    
   
    const words = await getUsersCollection().find().toArray();

    res.status(200).json({success:true, message: "Users successfully retrieved ", result: words});
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});










module.exports = router;
