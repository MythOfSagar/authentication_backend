const { Router } = require("express");
const UserModel = require("../model/user.model");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

userRouter.get("/", (req, res) => {
  res.send("HOME USER");
});

userRouter.post("/sign", async (req, res) => {
  const { email, pass } = req.body;
  try {
    bcrypt.hash(pass, 3, async (err, hash) => {
      if (err) {
        res.send("ERROR while Sign");
      } else {
        const newUser = new UserModel({ email, pass: hash });
        await newUser.save();
        res.send("newUser");
      }
    });
  } catch (err) {
    res.send("err");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass} = req.body;
  console.log(req.body)
  try {
    const theUser = await UserModel.find({ email });
    if (theUser.length > 0) {
      bcrypt.compare(pass, theUser[0].pass, function (err, result) {
        if (result) {
            const token = jwt.sign({ foo: email }, 'avt')
            res.send(token);
          
        } else {
            res.send("Wrong Password");
        }
      });
    } else {
      res.send("Enter correct Email");
    }
  } catch (err) {
    res.send("err");
    console.log(err)
  }
});

module.exports = { userRouter };
