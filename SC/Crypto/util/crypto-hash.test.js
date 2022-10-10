const CryptoHash=require("./crypto-hash")


describe("  CryptoHash  ",()=>{

    it("  genrerate SHA-256  ",()=>{

        expect( CryptoHash("foo") ).toEqual("2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae")

    });

    it("  Produce the same parameter and the same ansewerr SHA-256  ",()=>{

        expect( CryptoHash("one","two","three") ).toEqual( CryptoHash("two","three","one"))

    });

})