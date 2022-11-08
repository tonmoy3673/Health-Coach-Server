const express=require('express');
const cors=require ('cors');
const app=express();
require('dotenv').config();
const port=-process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5fuqo8h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){

    try{
        const serviceCollection=client.db('healthCoach').collection('services');
        
        app.get('/allServices',async(req,res)=>{
            const query={}
            const cursor=serviceCollection.find(query);
            const allServices=await cursor.toArray();
            res.send(allServices);
        })
        app.get('/services',async(req,res)=>{
            const query={}
            const cursor=serviceCollection.find(query);
            const services=await cursor.limit(3).toArray();
            res.send(services);
        })
    }
    finally{

    }
 }

 run().catch(err=>console.error(err));



app.get('/',(req,res)=>{
    res.send('Health Coach Server is Running')
})

app.listen(port,()=>{
    console.log(`Health Coach Server is Running on ${port}`);
})