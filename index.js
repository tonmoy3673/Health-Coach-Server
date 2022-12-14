const express=require('express');
const cors=require ('cors');
const app=express();
require('dotenv').config();
const port=-process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5fuqo8h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){

    try{
        const serviceCollection=client.db('healthCoach').collection('services');
        const orderCollection=client.db('healthCoach').collection('review');
        
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

        app.get('/services/:id',async(req,res)=>{

            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const service=await serviceCollection.findOne(query);
            res.send(service);
        })
        //review api

        app.get('/review',async(req,res)=>{
            let query={};
            if(req.query.email){
                query={
                    email:req.query.email
                }
            }
            const cursor=orderCollection.find(query);
            const review=await cursor.toArray();
            res.send(review);
        })

        app.get('/review/:id',async(req,res)=>{
            let query={}
            if(req.query.serviceName){
                query={
                    email:req.query.serviceName
                }
            }
            const cursor=orderCollection.find(query)
            const review=await cursor.toArray();
            res.send(review);
        })

        app.post('/review',async(req,res)=>{
            const review=req.body;
            const result=await orderCollection.insertOne(review);
            res.send(result);
        });


        app.delete('/review/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const result=await orderCollection.deleteOne(query);
            res.send(result);
            console.log(result);
        })

        app.post('/services',async(req,res)=>{
            const services=req.body;
            const result=await serviceCollection.insertOne(services);
            res.send(result);
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