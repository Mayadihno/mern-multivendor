const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwToken");
const {
  isAuthenticated,
  isSellerAuthenticated,
} = require("../middleware/auth");
const shopModel = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");

router.post("/create-seller", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    //to check if seller already exist with this email
    const sellerEmail = await shopModel.findOne({ email });
    if (sellerEmail) {
      const fileName = req.file.filename;
      const fileUrl = `uploads/${fileName}`;
      fs.unlink(fileUrl, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(
        new ErrorHandler("Seller already exist with this email address", 400)
      );
    }
    //to create new seller
    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);
    const seller = {
      shopName: req.body.shopName,
      email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      zipCode: req.body.zipCode,
      phoneNumber: req.body.phoneNumber,
    };
    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your account",
        message:
          `Hello ${seller.shopName},${seller.phoneNumber}, ${seller.address}, ${seller.zipCode}, please click on the link to activate your shop account ${activationUrl}`.replaceAll(
            ".",
            "-"
          ),
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-${seller.shopName} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, `${process.env.ACTIVATION_SECRET}`, {
    expiresIn: "5m",
  });
};

// activate seller
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const {
        shopName,
        email,
        password,
        avatar,
        zipCode,
        phoneNumber,
        address,
      } = newSeller;
      let seller = await shopModel.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }
      seller = await shopModel.create({
        shopName,
        email,
        avatar,
        password,
        zipCode,
        phoneNumber,
        address,
      });
      sendShopToken(seller, 201, res);
      //try to send a mail to the vendor that there account have been activated
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//login vendor router
router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("Please provide both email and password", 400)
        );
      }
      const seller = await shopModel.findOne({ email }).select("+password");
      if (!seller) {
        return next(new ErrorHandler("User not Found", 400));
      }
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Incorrect Password", 400));
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get login seller data
router.get(
  "/getseller-data",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await shopModel.findById(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("User not Found", 400));
      }
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

//logout vendor
router.get(
  "/shop-logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
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

//get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await shopModel.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

//update shop profile picture
router.put(
  "/update-seller-avatar",
  isSellerAuthenticated,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const existUser = await shopModel.findById(req.seller._id); //to check the login user id from isAuthenticated user
      const existAvatarPath = `uploads/${existUser.avatar}`; // the user avatar image
      fs.unlinkSync(existAvatarPath); // delete it from the database

      const fileUrl = path.join(req.file.filename);
      const user = await shopModel.findByIdAndUpdate(req.seller._id, {
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

//update seller informations
router.put(
  "/update-seller-info",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { address, zipCode, description, phoneNumber, name } = req.body;
      const seller = await shopModel.findOne(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("Shop not Found", 400));
      }
      seller.zipCode = zipCode;
      seller.address = address;
      seller.name = name;
      seller.description = description;
      seller.phoneNumber = phoneNumber;

      await seller.save();
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler("error.message", 500));
    }
  })
);

module.exports = router;
