const mongoose=require("mongoose")



const connection=mongoose.connect(dbUrl)

module.exports={connection}