const Block = require("./block");
const {GENESIS_DATA,MINE_RATE}=require("./../config")
const {CryptoHash}=require("./../util")
const hexToBinary=require("hex-to-binary")



describe("Block",()=>{


    const TimeStamp= 2000;
    const LastHash="foo-lasthash";
    const hash="hash";
    const data=["blockchain",'data']
    const difficulty=1;
    const nonce=1;


    const block=new Block({
        TimeStamp:TimeStamp,
        LastHash:LastHash,
        hash:hash,data:data,
        difficulty:difficulty,
        nonce:nonce
    })


    it("it has all for parameter",()=>{
        expect(block.TimeStamp).toEqual(TimeStamp);
        expect(block.LastHash).toEqual(LastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.difficulty).toEqual(difficulty);
        expect(block.nonce).toEqual(nonce);
    })




    describe("    genesis()     ",()=>{


        const genesisBlock=Block.genesis()
        // console.log(genesisBlock)

        it("return block instance",()=>{

            expect(genesisBlock instanceof Block).toEqual(true)

        });

        it("returns genesis is equl to static method",()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA)
        })

    });




    describe("   mineBlock()  ",()=>{

        const LastBlock=Block.genesis()
        
        const data="this is data for mine"
        const MinedBlock=Block.MineBlock({LastBlock,data})
        // console.log(MinedBlock)


        it(" return block instance  ",()=>{

            expect(MinedBlock instanceof Block).toEqual(true)

        });

        it(" set the `lasthash` to `hsah` of the LastBlock  ",()=>{

            expect(MinedBlock.LastHash).toEqual(LastBlock.hash)

        });
        
        it(" check 'data  ",()=>{

            expect(MinedBlock.data).toEqual(data)

        });

        it(" check 'TimeStamp  ",()=>{

            expect(MinedBlock.TimeStamp).not.toEqual(undefined)

        });

        it(" check 'hash  ",()=>{

            expect(MinedBlock.hash).toEqual(CryptoHash(LastBlock.hash,MinedBlock.nonce,MinedBlock.difficulty,data,MinedBlock.TimeStamp))

        });

        it("  sets the `hash` that matches the difficulty criteria  ",()=>{

            expect(hexToBinary( MinedBlock.hash).substring(0,MinedBlock.difficulty)).toEqual('0'.repeat(MinedBlock.difficulty))

        });

        it("  adjust the difficulty  ",()=>{

            const PossibleResult=[LastBlock.difficulty+1,LastBlock.difficulty-1]

            expect(PossibleResult.includes(MinedBlock.difficulty)).toBe(true)
        })

    });


    describe('  AdjustDifficulty()  ', () => { 

        it("  raise the difficulty for a quickly mined block  ",()=>{

            
            
            expect(Block.AdjustDifficulty({
                OriginalBlock:block,
                TimeStamp:block.TimeStamp+MINE_RATE -100
            })).toEqual(block.difficulty + 1)

        });
        

        it("  lower the difficulty for a slowly mined block  ",()=>{

            expect(Block.AdjustDifficulty({
                OriginalBlock:block,
                TimeStamp:block.TimeStamp+MINE_RATE+100
            })).toEqual(block.difficulty - 1)

        });

        it("  difficulty  must be one atleast  ",()=>{
            block.difficulty = -1
            expect(Block.AdjustDifficulty({OriginalBlock:block})).toEqual(1)
        })
        
     });

})
    