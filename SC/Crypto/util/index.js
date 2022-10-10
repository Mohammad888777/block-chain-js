const EC=require("elliptic").ec
const ec=new EC("secp256k1")
const CryptoHash=require("./crypto-hash")


const VerifySignature=({PublicKey,data,signature})=>{

    const KeyFromPublic=ec.keyFromPublic(PublicKey,'hex')

    return KeyFromPublic.verify(CryptoHash(data),signature)

}

module.exports={ec,VerifySignature,CryptoHash}