const { json } = require("express");
const redis=require("redis")

const CHANNELS= {
        TEST:'TEST ',
        BLOCKCHAIN:'BLOCKCHAIN'
}


class PubSub{
    constructor({blockchain}){

        this.blockchain=blockchain


        this.publisher = redis.createClient({
            port:6655
        }) ;
        this.subscriber = redis.createClient({
            port:6655
        });
        

        // this.subscriber.subscribe(CHANNELS.TEST)
        // this.subscriber.subscribe(CHANNELS.BLOCKCHAIN)

        this.SubscribeToChannel()


        this.subscriber.on("message",(channel,message)=>{
            this.HandleMessage(channel,message)
        });


    }




    SubscribeToChannel(){
        Object.values(CHANNELS).forEach(channel=>{
            this.subscriber.subscribe(channel)
        })
    }




    publish({channel,message}){

        this.subscriber.unsubscribe(channel,()=>{
            this.publisher.publish(channel,message,()=>{
                this.subscriber.subscribe(channel)
            })

        })

    };


    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)
        })
    }



    HandleMessage(channel,message){

            const parsedMessage=JSON.parse(message)

            if(channel === CHANNELS.BLOCKCHAIN){

                this.blockchain.ReplaceChain(parsedMessage)
            }

        // console.log(`MESSAGE RECIVED channel is => ${channel} and message is => ${message}`)

    }


    

}

module.exports=PubSub



// const p =new PubSub()
// setTimeout(()=>{
//     p.publisher.publish(CHANNELS.TEST,"foo")
// },100)