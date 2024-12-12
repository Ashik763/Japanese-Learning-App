const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// eslint-disable-next-line no-undef
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4rrjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let users, lessons, words;

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("JapaneseVocabularyLearningApp");
    users = db.collection("users");
    lessons = db.collection("lessons");
    words = db.collection("words");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = {
  connectToDatabase,
  getUsersCollection: () => users,
  getLessonsCollection: () => lessons,
  getWordsCollection: () => words,
};
