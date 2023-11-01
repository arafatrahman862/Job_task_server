const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfg6ad4.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const categorizeCollection = client.db("Job_task").collection("categorize");
    const clozerCollection = client.db("Job_task").collection("clozer");
    const comprehensionCollection = client.db("Job_task").collection("comprehension");

    app.get('/categorize', async(req, res)=>{
        const result = await categorizeCollection.find().toArray();
        res.send(result)
    })

    app.get('/clozer', async(req, res)=>{
        const result = await clozerCollection.find().toArray();
        res.send(result)
    })

    app.get('/comprehension', async(req, res)=>{
        const result = await comprehensionCollection.find().toArray();
        res.send(result)
    })


    app.post('/categorize', async (req, res)=>{
        const categorize = req.body;
        console.log(categorize)
        const result = await categorizeCollection.insertOne(categorize);
        res.send(result)
      })


    app.post('/clozer', async (req, res)=>{
        const clozer = req.body;
        console.log(clozer)
        const result = await clozerCollection.insertOne(clozer);
        res.send(result)
      })


    app.post('/comprehension', async (req, res)=>{
        const comprehension = req.body;
        console.log(comprehension)
        const result = await comprehensionCollection.insertOne(comprehension);
        res.send(result)
      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Job task')
})


app.listen(port, ()=>{
    console.log(`Job Task is on port ${port}`);
})