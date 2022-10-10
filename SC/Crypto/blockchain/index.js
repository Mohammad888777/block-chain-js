const Block=require("./block")
const {CryptoHash}=require("./../util")


class BlockChain{
 
    constructor(){
        this.chain=[Block.genesis()]
    }

    AddBlock({data}){

       const NewBlock= Block.MineBlock(
            {
                LastBlock:this.chain[this.chain.length-1],data

            }
        )
        this.chain.push(NewBlock)

    }

    static IsValidChain(chain){

        if (JSON.stringify( chain[0] ) !== JSON.stringify( Block.genesis() )){
            return false
        }
        

        for(let i=1;i<chain.length;i++){

            const block=chain[i]
            const actualLastHash=chain[i-1].hash
            const LastDifficulty=chain[i-1].difficulty
            const {TimeStamp,LastHash,hash,data,difficulty,nonce}=block

            if (LastHash !== actualLastHash) return false

            if(Math.abs(LastDifficulty-difficulty)>1){
                return false
            }

            if (hash !== CryptoHash(LastHash,TimeStamp,data,difficulty,nonce)) return false

        }
        return true

    }


    ReplaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error("the incomming chain must be longer")
            return 
        }
        if(!BlockChain.IsValidChain(chain)){
            console.error("this is the second return")
            return 
        }
        console.log("this is the replace with ther new one")

        this.chain=chain

    }

    
}
module.exports=BlockChain