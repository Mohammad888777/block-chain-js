const INITIAL_DIFFICULTY=3;
const MINE_RATE=1000;
const  STARTING_BALANCE=1000;

const GENESIS_DATA={
     TimeStamp: "Geneis Time stamp",
     LastHash:"last hash gens",
     hash:"gen hash",
     difficulty:INITIAL_DIFFICULTY,
     nonce:1,
     data:["asdad",'data']
}
module.exports={GENESIS_DATA,MINE_RATE,STARTING_BALANCE}