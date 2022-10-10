const BlockChain=require("./../blockchain")
const blockchain=new BlockChain()

blockchain.AddBlock({data:"initial"})
let PrevTimeStamp,NextTimeStamp,NextBlock,TimeDiff,Average;

console.log(blockchain.chain[blockchain.chain.length-1])
const times=[];

for(let i=0;i<100;i++){

    PrevTimeStamp=blockchain.chain[blockchain.chain.length-1].TimeStamp;

    blockchain.AddBlock({data:`block ${i}`})

    NextBlock=blockchain.chain[blockchain.chain.length-1]

    NextTimeStamp=NextBlock.TimeStamp

    TimeDiff=NextTimeStamp - PrevTimeStamp

    times.push(TimeDiff)

    Average=times.reduce((sum,item)=>sum+item)/times.length

    console.log(` Time to mine block is :  ${TimeDiff}  and difiiculty is  :  ${NextBlock.difficulty} Avg time is  :  ${Average} `)

}