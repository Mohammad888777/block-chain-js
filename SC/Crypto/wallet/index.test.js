const Wallet=require("./index")
const {VerifySignature}=require("./../util")

describe('  Wallet  ', () => { 

    let wallet;

    beforeEach(()=>{
        wallet=new Wallet()
    });

    it("  wallet has property  'balance'  ",()=>{
        expect(wallet).toHaveProperty('balance')
    });

    it("  wallet has property  'PublicKey'  ",()=>{
        expect(wallet).toHaveProperty('PublicKey')
    });

    describe("  sign()  ",()=>{

        const data="fake data";
        it(" Verified signature ",()=>{

            expect(VerifySignature({
                PublicKey:wallet.PublicKey,
                data:data,
                signature:wallet.sign(data)
            })).toBe(true)

        });

        it("  signature is not Verified ",()=>{

            expect(VerifySignature({
                PublicKey:wallet.PublicKey,
                data:data,
                signature:new Wallet().sign(data)
            })).toBe(false)

        });

    });
    

});