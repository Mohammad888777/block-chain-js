const {GENESIS_DATA,MINE_RATE}=require("./../config")
const {CryptoHash}=require("./../util")
const hexToBinary=require("hex-to-binary")



class Block{
    constructor({TimeStamp,LastHash,hash,data,difficulty,nonce}){
        this.TimeStamp=TimeStamp
        this.LastHash=LastHash
        this.hash=hash
        this.data=data
        this.difficulty=difficulty
        this.nonce=nonce
    }

    static genesis(){
        return new this(GENESIS_DATA)
    }
    
    static MineBlock({LastBlock,data}){
        let hash,TimeStamp
        // const TimeStamp=Date.now()
        const LastHash=LastBlock.hash
        let {difficulty}=LastBlock
        let nonce=0

        do{    
            nonce++;
            TimeStamp=Date.now();
            difficulty=Block.AdjustDifficulty({OriginalBlock:LastBlock,TimeStamp:TimeStamp})
            hash=CryptoHash(LastHash,TimeStamp,data,difficulty,nonce);
            
        }while(hexToBinary(hash).substring(0,difficulty)  !=='0'.repeat(difficulty))

        return new Block({

             TimeStamp: TimeStamp,

             LastHash:LastHash,

             hash:hash,

             data:data,

             difficulty:difficulty,

             nonce:nonce,


        })


    }

    static AdjustDifficulty({OriginalBlock,TimeStamp}){

        const {difficulty}=OriginalBlock
        
        if (difficulty<1){
            return 1
        }
        
        if((TimeStamp - OriginalBlock.TimeStamp)>MINE_RATE) {
            return difficulty-1
        }
        return difficulty+1
    }

}
// console.log(Block.gensis())
module.exports =Block;