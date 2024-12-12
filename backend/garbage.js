
// const express = require("express");
// const cors = require("cors");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// // const bodyParser = require('body-parser');
// // var Regex = require("regex");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// require("dotenv").config();
// const app = express();

// // const router = express.Router();
// const port = 5000;
// const lessonsRoutes= require('./lessonsRoutes');

// // middleware
// app.use(cors());
// app.use(express.json());



// // eslint-disable-next-line no-undef
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4rrjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });







// // async function run() {
//   // try {
//     const users = client.db("JapaneseVocabularyLearningApp").collection("users");
//     const lessons = client.db("JapaneseVocabularyLearningApp").collection("lessons");
//     const words = client.db("JapaneseVocabularyLearningApp").collection("words");

//     // 

//     app.use('/lessons',lessonsRoutes);

//     app.post('/signup', async (req, res) => {
//       try{
//         const { name,email, password, photo } = req.body;
//       const existingUser = await users.findOne({email});
//       // console.log(existingUser);
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//       }
//       const hashedPassword = await bcrypt.hash(password, 7);
//       const result = await users.insertOne({name,email,password:hashedPassword,photo});
  
    
//       // eslint-disable-next-line no-undef
//       const token = jwt.sign({ email, id:result.insertedId.toString(),name,photo:photo }, process.env.JWT_SECRET, { expiresIn: '2h' });
    
//       res.status(201).json({success:true, message: 'User created successfully', token });

//       }
//       catch(err){
//         res.status(500).json({success:false, message:err})

//       }
      
//     });


//     app.post('/signin', async (req, res) => {
//       const { email , password } = req.body;
    

//       const user = await users.findOne({email});
//       console.log(user);
      
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
     
    
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
//       const {name,photo,_id } = user;
//        // eslint-disable-next-line no-undef
//       const token = jwt.sign({ email,name,photo,id:_id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//       res.status(200).json({ message: 'Sign-in successful', token });
//     });
    

//     app.get("/allUsers", async (req, res) => {
//       // const query = { approved: true };
//       const tourPlaces = await users.find({}).toArray();
//       res.send(tourPlaces);
//     });




//     // app.get("/myTours/:email", async (req, res) => {
//     //   const email = req.params.email;
//     //   const query = { email: email };
//     //   const tourPlaces = await tours.find(query).toArray();
//     //   //  console.log(tourPlaces);
//     //   res.send(tourPlaces);
//     // });
//     // app.get("/allPendingTours", async (req, res) => {
//     //   const query = { pending: true, declined: false };
//     //   const tourPlaces = await tours.find(query).toArray();
//     //   res.send(tourPlaces);
//     // });
//     // app.get("/allDeclinedTours", async (req, res) => {
//     //   const query = { declined: true };
//     //   const tourPlaces = await tours.find(query).toArray();
//     //   res.send(tourPlaces);
//     // });
//     // app.get("/admins", async (req, res) => {
//     //   const query = {};
//     //   const admin = await admins.find(query).toArray();
//     //   res.send(admin);
//     // });
//     // app.get("/homeTours", async (req, res) => {
//     //   const query = {};
//     //   const tourPlaces = await tours.find(query).limit(3).toArray();
//     //   res.send(tourPlaces);
//     // });
//     // app.get("/tourDetails/:id", async (req, res) => {
//     //   // console.log(typeof(req.params.id));
//     //   const id = req.params.id;
//     //   // const query = {};
//     //   const query = { _id: new ObjectId(id) };
//     //   // console.log(query);
//     //   const tourPlace = await tours.findOne(query);
//     //   res.send(tourPlace);
//     // });
//     // app.get("/reviews/:id", async (req, res) => {
//     //   console.log(typeof req.params.id);
//     //   const id = req.params.id;
//     //   // const query = {};
//     //   const query = { tour_id: id };
//     //   console.log(query);
//     //   const reviewsOnTour = await reviews.find(query).toArray();
//     //   res.send(reviewsOnTour);
//     // });
//     // app.get("/homeReviews/", async (req, res) => {
//     //   const query = {};

//     //   // console.log(query);
//     //   const reviewsOnHome = await reviews.find(query).limit(3).toArray();
//     //   res.send(reviewsOnHome);
//     // });
//     // app.get("/myReviews/:email", async (req, res) => {
//     //   const email = req.params.email;
//     //   const query = { email: email };
//     //   // console.log(email);
//     //   const myReviews = await reviews.find(query).toArray();

//     //   res.send(myReviews);
//     // });
//     // app.get("/searchQuery/:text", async (req, res) => {
//     //   const searchText = req.params.text;
//     //   // console.log(searchText);
//     //   // const dynamicRegex = new RegExp(searchText, 'i');

//     //   // Create a dynamic regular expression based on the 'searchText' parameter
//     //   const query = {
//     //     tour_name: { $regex: new RegExp(searchText, "i") },
//     //     approved: true,
//     //   };

//     //   const tourPlaces = await tours.find(query).toArray();
//     //   res.send(tourPlaces);
//     // });

//     // app.post("/addReview", async (req, res) => {
//     //   const review = req.body;
//     //   // console.log(review)
//     //   const result = await reviews.insertOne(review);
//     //   // console.log(result);
//     //   res.send(result);
//     // });
//     // app.post("/addService", async (req, res) => {
//     //   const tour_package = req.body;
//     //   // console.log(tour_package);
//     //   const result = await tours.insertOne(tour_package);
//     //   // console.log(result);
//     //   res.send(result);
//     // });
//     // app.post("/addAdmin", async (req, res) => {
//     //   const admin = req.body;
//     //   // console.log(admin);
//     //   const result = await admins.insertOne(admin);
//     //   // console.log(result);
//     //   res.send(result);
//     // });

//     // app.delete("/myReview/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   // console.log(id);
//     //   const query = { _id: new ObjectId(id) };
//     //   const result = await reviews.deleteOne(query);
//     //   res.send(result);
//     // });
//     // app.delete("/deleteMyTour/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   // console.log(id);
//     //   const query = { _id: new ObjectId(id) };
//     //   const result = await tours.deleteOne(query);
//     //   res.send(result);
//     // });

//     // app.patch("/updateReview/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   const description = req.body.description;
//     //   const query = { _id: new ObjectId(id) };
//     //   const updatedDoc = {
//     //     $set: {
//     //       description: description,
//     //     },
//     //   };
//     //   const result = await reviews.updateOne(query, updatedDoc);
//     //   res.send(result);
//     // });

//     // app.patch("/approveTour/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   // const description = req.body.description;
//     //   const query = { _id: new ObjectId(id) };
//     //   const updatedDoc = {
//     //     $set: {
//     //       pending: false,
//     //       declined: false,
//     //       approved: true,
//     //     },
//     //   };
//     //   const result = await tours.updateOne(query, updatedDoc);
//     //   res.send(result);
//     // });
//     // app.patch("/declineTour/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   // const description = req.body.description;
//     //   const query = { _id: new ObjectId(id) };
//     //   const updatedDoc = {
//     //     $set: {
//     //       pending: false,
//     //       declined: true,
//     //       approved: false,
//     //     },
//     //   };
//     //   const result = await tours.updateOne(query, updatedDoc);
//     //   res.send(result);
//     // });
//     // app.patch("/joinInTour/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   const { email, name, UserImg } = req.body;
//     //   const query = { _id: new ObjectId(id) };
//     //   // const updatedDoc = {
//     //   //   $set:{
//     //   //     travellers:[{$push:{email,name,UserImg}}]
//     //   //   }
//     //   // }
//     //   const result = await tours.updateOne(query, {
//     //     $addToSet: { travellers: { email, name, UserImg } },
//     //   });
//     //   res.send(result);
//     // });
//     // app.patch("/cancelTour/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   const { email, name, UserImg } = req.body;
//     //   const query = { _id: new ObjectId(id) };
//     //   console.log("clicked");
//     //   // const updatedDoc = {
//     //   //   $set:{
//     //   //     travellers:[{$pull:{email,name,UserImg}}]
//     //   //   }
//     //   // }
//     //   const result = await tours.updateMany(query, {
//     //     $pull: { travellers: { email, name, UserImg } },
//     //   });
//     //   res.send(result);
//     // });
//   // }  
//   // finally {
//   //   console.log("in the finally");
//   // }
// // }
// // run().catch(console.dir);

// app.get("/", (req, res) => {
//   // console.log(tours);

//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// module.exports = {
//   users,
//   lessons,
//   words
// }
