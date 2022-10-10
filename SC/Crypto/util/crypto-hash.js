const crypto=require("crypto")

const CryptoHash=(...input)=>{
    
    const hash=crypto.createHash("sha256")

    hash.update(input.sort().join(" "))

    return  hash.digest("hex") 

}
module.exports=CryptoHash
