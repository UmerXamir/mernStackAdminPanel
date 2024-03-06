const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//Register

router.post("/register", async (req, res) => {
  const { userName, password, email } = req.body;
  const newUser = new User({
    userName: userName,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    email:email
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    console.error('------------Error',e);
    res.status(500).json(e);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      res.status(404).json("User Does Not Exist");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong Credentials");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({...others, accessToken});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
