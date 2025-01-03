const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors())
app.use(express.json())

//mrmostafiz247
//5NBA1ZNSpW5Ry89O

app.get("/", (req,res)=>{
    res.send("simple crud system is running")
})



const uri = "mongodb+srv://mrmostafiz247:5NBA1ZNSpW5Ry89O@cluster0.f1rv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get("/users", async(req,res)=>{
        const cursor= userCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    });

    app.get("/users/:id", async(req,res)=>{
        const id =req.params.id;
        const query = {_id: new ObjectId(id)}
        const user = await userCollection.findOne(query)
        res.send(user)
        
    })

    app.post("/users", async(req,res)=>{
        const user=req.body;
        const result = await userCollection.insertOne(user);
        console.log("new user",user)
        res.send(result)

    })

    app.delete("/users/:id", async(req,res)=>{
        const id =req.params.id;
        const query={_id : new ObjectId(id)}
        const result = await userCollection.deleteOne(query)
        res.send(result)
        console.log("delete this id from database",id)
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


app.listen(port, ()=>{
    console.log(`simple crud system is running on port : ${port}`)
})