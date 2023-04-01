const mongoose =require ("mongoose")

const avatarSchema=mongoose.Schema({
    name:String,
    username:String
})

const AvatarModel=mongoose.model("avatars",avatarSchema)

module.exports=AvatarModel