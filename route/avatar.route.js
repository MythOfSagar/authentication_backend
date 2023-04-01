const { Router } = require("express");
const AvatarModel = require("../model/avatar.model");
const avatarRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middlewware");

avatarRouter.get("/", async (req, res) => {
  const avatars = await AvatarModel.find();
  res.send(avatars);
});
 
avatarRouter.use(auth);
avatarRouter.post("/create", async (req, res) => {
  const payload = req.body;
  const decoded = jwt.verify(req.headers.authorization, "avt");
  console.log(decoded);
  try {
    const newAvatar = new AvatarModel(payload);
    await newAvatar.save();
    res.send("newAvatar");
  } catch (err) {
    res.send("err");
  }
});

avatarRouter.delete("/delete/:id", async (req, res) => {
  const del_avatar = await AvatarModel.findOne({ _id: req.params.id });
  const avatar_username = del_avatar.username;

  const decoded = jwt.verify(req.headers.authorization, "avt");
  thtrytrytr
  try {
    if (avatar_username === decoded.foo) {
        

       await AvatarModel.findByIdAndDelete({ _id: req.params.id });
      res.send("DELETED");
    } else {
      res.send("You Are NOT AUTHORIZED");
    }
  } catch (err) {
    console.log(err);
    res.send("ERROR in DELETION");
  }
});

module.exports = { avatarRouter };
