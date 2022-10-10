const Transaction=require("./transaction")
const Wallet=require("./index")
const {VerifySignature}=require("./../util")


describe(" Transaction  ",()=>{
    let transaction,SenderWallet,recipient,amount
    beforeEach(()=>{
        SenderWallet=new Wallet()
        recipient="fake recipient";
        amount=50;
        transaction=new Transaction({SenderWallet,recipient,amount})
    });
    it("  transaction  has propperty id  ",()=>{
        expect(transaction).toHaveProperty("id")
    });

    describe('   OutputMap    ', () => { 

        it("  transaction has propperty  OutputMap ",()=>{

            expect(transaction).toHaveProperty("OuputMap")

        });

        it("  Ouputs the amount to recepient  ",()=>{

            expect(transaction.OuputMap[recipient]).toEqual(amount)

        });

        it("  Output the remaning balance for 'sender wallet  ",()=>{

            expect(transaction.OuputMap[SenderWallet.PublicKey]).toEqual( SenderWallet.balance - amount )
            
        });

        

    });


    
    describe("  Input  ",()=>{

        it("  transaction has propperty  Input ",()=>{

            expect(transaction).toHaveProperty("Input")

        });

        it("  Input  has prpperty TimeStamp",()=>{

            expect(transaction.Input).toHaveProperty("TimeStamp")

        });

        it(" sets the amount to sender wallet balance ",()=>{

            expect(transaction.Input.amount).toEqual(SenderWallet.balance)

        });

        
        it(" sets the address to sender wallet PublicKey ",()=>{

            expect(transaction.Input.address).toEqual(SenderWallet.PublicKey)

        });

        
        it(" sign the Input",()=>{

            expect(VerifySignature({
                PublicKey:SenderWallet.PublicKey,
                data:transaction.OuputMap,
                signature:transaction.Input.signature
            })).toBe(true)

        });


    });


    describe('  ValidTransaction()   ', () => { 
        
        let ErroMuck;
        beforeEach(()=>{
            ErroMuck=jest.fn();
            global.console.error=ErroMuck
        });
        
        describe(' Transaction is Valid   ', () => { 
        
            it(" return true  ",()=>{

                expect(Transaction.ValidTransaction(transaction)).toBe(true)
            });
            
        });
            
        describe(' Transaction is  not Valid   ', () => { 
        
                describe('  transaction ouputmap  value is inalid  ', () => { 

                    it(" return false  ",()=>{

                        transaction.OuputMap[SenderWallet.PublicKey]=99988
                        expect(Transaction.ValidTransaction(transaction)).toBe(false)

                        expect(ErroMuck).toHaveBeenCalled()

                    });
                    
                });

                describe('  transaction input signatue   is inalid  ', () => { 

                    it(" return false  ",()=>{

                        transaction.Input.signature=new Wallet().sign("data")

                        expect(Transaction.ValidTransaction(transaction)).toBe(false)

                        // expect(ErroMuck).toHaveBeenCalled()


                    });
                    
                });

        });

    });
})