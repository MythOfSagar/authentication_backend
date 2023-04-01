const express=require("express")
const connection=require("./config/db")
const {userRouter}=require("./route/user.route")
const {avatarRouter}=require("./route/avatar.route")

const app=express();

app.use(express.json())

app.use("/users",userRouter)
app.use("/avatars",avatarRouter)

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.listen(7777,async()=>{
    
    try{
        await connection;
        console.log("Connected")
    }
    catch(err){
        console.log(err)
        console.log("Error while Connecton")
    }
})