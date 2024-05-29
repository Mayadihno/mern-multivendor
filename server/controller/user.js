const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const userModel = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwToken");
const { isAuthenticated } = require("../middleware/auth");
//to create user account/register user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  //this data are coming from frontend
  try {
    const { name, email, password } = req.body;

    //to check if user already exist with this email
    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      const fileName = req.file.filename;
      const fileUrl = `uploads/${fileName}`;
      fs.unlink(fileUrl, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(
        new ErrorHandler("User already exist with this email address", 400)
      );
    }
    //to create new user
    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);
    const user = {
      name,
      email,
      password,
      avatar: fileUrl,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message:
          `Hello ${user.name}, please click on the link to activate your account ${activationUrl}`.replaceAll(
            ".",
            "-"
          ),
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-${user.name} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, `${process.env.ACTIVATION_SECRET}`, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await userModel.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await userModel.create({
        name,
        email,
        avatar,
        password,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//login user router
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("Please provide both email and password", 400)
        );
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not Found", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Incorrect Password", 400));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get login user data
router.get(
  "/getuser-data",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User not Found", 400));
      }
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

//logout user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful",
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);
//update user informations
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not Found", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Incorrect Password", 400));
      }
      user.name = name;
      user.password = password;
      user.phoneNumber = phoneNumber;

      await user.save();
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);
//update user avatar
router.put(
  "/update-user-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const existUser = await userModel.findById(req.user.id); //to check the login user id from isAuthenticated user
      const existAvatarPath = `uploads/${existUser.avatar}`; // the user avatar image
      fs.unlinkSync(existAvatarPath); // delete it from the database

      const fileUrl = path.join(req.file.filename);
      const user = await userModel.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

//update user address
router.put(
  "/update-user-address",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);
      const sameAddressType = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameAddressType) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exist`)
        );
      }
      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );
      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        //add the new address to the array
        user.addresses.push(req.body);
      }
      await user.save();
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

//delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await userModel.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            addresses: {
              _id: addressId,
            },
          },
        }
      );

      const user = await userModel.findById(userId);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

//update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id).select("+password");
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler(
            "New password and Confirm Password did not match",
            400
          )
        );
      }
      user.password = req.body.newPassword;
      await user.save();
      res.status(201).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

// find user infoormation with the userId
router.get(
  "/user-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
