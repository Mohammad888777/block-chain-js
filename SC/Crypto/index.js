const express=require("express")
const BlockChain=require("./blockchain")
const PubSub=require("./app/pubsub")
const tcpPortUsed=require("tcp-port-used")
const axios=require("axios")

const app=express()
app.use(express.json())


const blockchain=new BlockChain()
const pubsub=new PubSub({blockchain:blockchain})

// setTimeout(() => {
//     pubsub.broadcastChain()
// }, 1000);



app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)
})




app.post("/api/mine/",(req,res)=>{
    const {data}=req.body;
    blockchain.AddBlock({data:data})
    pubsub.broadcastChain()
    res.redirect("/api/blocks/")
})



const rootPort=3000 ;
let PORT=3000;

const syncChains= async()=>{

  const response= await  axios.get(`http://localhost:${rootPort}/api/blocks/`)
  blockchain.ReplaceChain(response.data)

}

tcpPortUsed.check(3000,"127.0.0.1")
.then(function (inUse){
    if (inUse){
        PORT+=Math.ceil(Math.random()*1000)
    }
    app.listen(PORT,()=>{

        console.log(`listening at localhost:${PORT}`)
        if(PORT !== rootPort){
            syncChains()
        }
    })

})




