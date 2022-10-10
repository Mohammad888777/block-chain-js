
let HashFunc=(input)=>{
    return "+"+input+"+"
}


class Block{
    constructor(data,hash,lastHash){
        this.data=data;
        this.hash=hash;
        this.lastHash=lastHash;
    }
}

class BlcokChain{
    constructor(){
        const genesis=new Block("foo-data","foo-hash","foo-last-hash")
        this.chain=[genesis]
    }

    AddBlcok(data){
        const LastHash=this.chain[this.chain.length-1].hash
        const hash=HashFunc(data+LastHash)
        const block=new Block(data,hash,LastHash)
        this.chain.push(block)
    }

}

let b=new BlcokChain
b.AddBlcok("mohammad")
b.AddBlcok("alireza")
b.AddBlcok("")
console.log(b.chain)


