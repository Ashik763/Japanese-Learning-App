const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { connectToDatabase, getUsersCollection } = require("./db");
const lessonsRoutes = require("./lessonsRoutes");
const wordsRoutes = require("./wordsRoutes");
const usersRoutes = require("./usersRoutes");
// const verifyToken = require("./middlewares/verifyToken");
const verifyAdmin = require("./middlewares/verifyAdmin");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase().then(() => {
  console.log("Database connected");

  // Routes
  app.use("/lessons", lessonsRoutes);
  app.use("/words",verifyAdmin, wordsRoutes);
  app.use("/users",verifyAdmin, usersRoutes);

  app.post("/signup", async (req, res) => {
    try {
      const { name, email, password, photo } = req.body;
      const usersCollection = getUsersCollection();
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 7);
      const result = await usersCollection.insertOne({ name, email, password: hashedPassword, photo });

      const token = jwt.sign(
        { email, id: result.insertedId.toString(), name, photo, role:"user" },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.status(201).json({ success: true, message: "User created successfully", token });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });

  app.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      const usersCollection = getUsersCollection();
      const user = await usersCollection.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const { name, photo, _id,role } = user;
      // eslint-disable-next-line no-undef
      const token = jwt.sign({ email, name, photo, id: _id.toString(),role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Sign-in successful", token });
    } catch (err) {
      res.status(500).json({ message: "Error during sign-in", error: err });
    }
  });

  app.get("/allUsers", async (req, res) => {
    try {
      const usersCollection = getUsersCollection();
      const users = await usersCollection.find({}).toArray();
      res.send(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

