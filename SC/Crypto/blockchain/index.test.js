const Block=require("./block")
const BlockChain=require("./index")
const {CryptoHash}=require("./../util")

describe("  BlcokChain()  ",()=>{

    let blockchain,newChain,OriginalChain

    beforeEach(()=>{

        blockchain=new BlockChain()
        newChain=new BlockChain()
        OriginalChain=blockchain.chain
    })

    it("  contain a chain `Array instance`  ",()=>{

        expect(blockchain.chain instanceof Array).toBe(true)

    });
    
    it(" start with the genesis block  ",()=>{

        expect(blockchain.chain[0]).toEqual(Block.genesis())

    });

    it("  add a new block to chain",()=>{

        const NewData="foo bar"
        blockchain.AddBlock({data:NewData})

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(NewData)

    });


    describe("  IsValidChain()  ",()=>{

        beforeEach(()=>{
            
                    blockchain.AddBlock({data:"mohammad"});
                    blockchain.AddBlock({data:"alireza"});
                    blockchain.AddBlock({data:"amir"});
                    blockchain.AddBlock({data:"reza"});
        })

        describe("  when the chain does not start with genesis  ",()=>{

                
            it("   return false   ",()=>{

                blockchain.chain[0]={data:"fake"}

                expect(BlockChain.IsValidChain(blockchain.chain)).toBe(false)
            });

        });


        describe("  when the chain starts with genesis and has multiple blocks ",()=>{

            
            describe('  and lasthash refrence has changed   ',()=>{

                it("   return false   ",()=>{

                    

                    blockchain.chain[2].LastHash="changed last hash"

                    expect(BlockChain.IsValidChain(blockchain.chain)).toBe(false)

                });

            });

            describe('  and the chain contains a block with invalid field ',()=>{

                it("   return false   ",()=>{

                    

                    blockchain.chain[2].data="changed data"


                    expect(BlockChain.IsValidChain(blockchain.chain)).toBe(false)

                });
                
            });

            describe('   and the chain does not contain any invalid blocks  ',()=>{
                
                it("   return true   ",()=>{

                    

                    expect(BlockChain.IsValidChain(blockchain.chain)).toBe(true)

                });

            });

            describe('  and the chain contains a block with jumped difficulty  ', () => { 

                it(" returns false (((  to prevent the hacker to change the difficulty  ))) ",()=>{

                    const LastBlock=blockchain.chain[blockchain.chain.length-1]
                    const LastHash=LastBlock.hash
                    const TimeStamp=Date.now()
                    const nonce=0
                    const data=[]
                    const difficulty=LastBlock.difficulty-3
                    const hash=CryptoHash(data,nonce,difficulty,LastHash,TimeStamp)
                    const BadBlock=new Block({
                        TimeStamp:TimeStamp,
                        LastHash:LastHash,
                        nonce:nonce,
                        data:data,
                        difficulty:difficulty,
                        hash:hash
                    })
                    blockchain.chain.push(BadBlock)

                    expect(BlockChain.IsValidChain(blockchain.chain)).toBe(false)

                });
             });

        });  

    });

    describe("  ReplaceChain()  ",()=>{


        let ErrorMuck,LogMuck;

        beforeEach(()=>{

            ErrorMuck=jest.fn();
            LogMuck=jest.fn();
            global.console.error=ErrorMuck
            global.console.log=LogMuck

        })

            

        describe(" when new chain is not longer thand proir chain  ",()=>{
            
            beforeEach(()=>{
                newChain.chain[0]={news:"chain"}
                blockchain.ReplaceChain(newChain.chain)
            })
            
            it("  does not replace chain  ",()=>{
                
                expect(blockchain.chain).toEqual(OriginalChain)
            });

            it(" Logs and Errors ",()=>{
                
                expect(ErrorMuck).toHaveBeenCalled()
            });


        });

        describe("   when new chain is  longer thand proir chain  ",()=>{

            beforeEach(()=>{
                newChain.AddBlock({data:"mohammad"});
                newChain.AddBlock({data:"alireza"});
                newChain.AddBlock({data:"amir"});
                newChain.AddBlock({data:"reza"});
            });

            describe("   when new chain is  invalid  ",()=>{

                beforeEach(()=>{
                    newChain.chain[2].hash="fake"
                    blockchain.ReplaceChain(newChain.chain)
                })

                it("  does not replace chain  ",()=>{

                    
                    expect(blockchain.chain).toEqual(OriginalChain)
                });



                it(" Logs and Errors  ",()=>{

                    
                    expect(ErrorMuck).toHaveBeenCalled()
                });

    
            });

            describe("   when new chain is  valid  ",()=>{

                beforeEach(()=>{
                    blockchain.ReplaceChain(newChain.chain)

                })
                
                it("  replace chain  ",()=>{
                    expect(blockchain.chain).toEqual(newChain.chain)
                });


                it("  Logs and Errors  ",()=>{
                    expect(LogMuck).toHaveBeenCalled()
                });

            });
    
        })
    
    })

    

})