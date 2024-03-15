const { ObjectId } = require("mongodb");
const CryptoJS = require("crypto-js");

const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../models/User");
const { response } = require("express");

// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   const { password } = req.body;
//   const {id}=req.params
//   if (password) {
//     password = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     console.log('updatedUser', updatedUser)
//     res.status(200).json(updatedUser)
//   } catch (error) {res.status(500).json(error)}
// });

//getById

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { password, ...others } = user;
    response.status(200).json(others);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//getAllUsers

router.get("/list", async (req, res) => {
  try {
    const data = await User.find().sort({ userName: 1 });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//getAllUsers

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("------body", id);

    const updatedUser = await User.findByIdAndUpdate(
      new ObjectId(id),
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log("updatedUser", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//getAllUsers

router.post("/adduser", async (req, res) => {
  try {
console.log("req.body", req.body);
    
const user = new User({
      customerName: req.body.customerName,
      userName: req.body.userName,
      email: req.body.email,
      photo: req.body.user,
    });

    // Save the user to the database
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log('errrror',error);
    res.status(500).json(error);
  }
});


module.exports = router;
