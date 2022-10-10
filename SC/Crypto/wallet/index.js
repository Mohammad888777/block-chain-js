const {STARTING_BALANCE}=require("./../config")
const {ec,CryptoHash}=require("./../util")
// const CryptoHash=require("./../util/crypto-hash")


class Wallet{

    constructor(){

        this.KeyPair=ec.genKeyPair()

        this.balance=STARTING_BALANCE;

        this.PublicKey=this.KeyPair.getPublic().encode("hex")

    }
    sign(data){

       return  this.KeyPair.sign(CryptoHash(data))

    }
}
module.exports=Wallet