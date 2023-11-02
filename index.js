import cors from 'cors';
import dotenv from "dotenv";
import express, { json } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfg6ad4.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());
app.use(json());

// Connect the client to the server	(optional starting in v4.7)
await client.connect();

// Send a ping to confirm a successful connection
await client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

const questionCollection = client.db("Job_task").collection("question");

app
  .get('/', (_req, res) => res.send('Job task'))
  .get('/question', async (_req, res) => {
    res.send(await questionCollection.find().toArray());
  })
  .post('/question', async (req, res) => {
    const question = req.body;
    // console.debug("/question", question)
    res.send(await questionCollection.insertOne(question))
  })

app.listen(port, () => console.info(`Job Task is on port ${port}`))