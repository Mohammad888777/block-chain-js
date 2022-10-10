const {v1}=require("uuid")
const {VerifySignature}=require("./../util")


class Transaction{

    constructor({SenderWallet,recipient,amount}){

        this.id=v1()
        this.OuputMap=this.CreateOuputMap({SenderWallet:SenderWallet,recipient:recipient,amount:amount})
        this.Input=this.CreateInput({SenderWallet,OuputMap:this.OuputMap})
    }

    CreateOuputMap({SenderWallet,recipient,amount}){
        const output={}
        output[recipient]=amount
        output[SenderWallet.PublicKey]=SenderWallet.balance-amount
        return output
    }

    CreateInput({SenderWallet,OuputMap}){
        return{
            TimeStamp:Date.now(),
            amount:SenderWallet.balance,
            address:SenderWallet.PublicKey,
            signature:SenderWallet.sign(OuputMap)
        }
    };

    static ValidTransaction(transaction){

        const{OuputMap,Input:{address,amount,signature}}=transaction
        const totalOutput=Object.values(OuputMap).reduce((sum,item)=>sum+item)
        if(totalOutput !== amount){
            console.error("invalid transaction form")
            return false
        } 
        if(!VerifySignature({PublicKey:address,data:OuputMap,signature:signature})){
            return false
        }
        return true
    }

}
module.exports=Transaction