const shopModel = require("../model/shop");
const userModel = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await userModel.findById(decode.id);
  next();
});

exports.isSellerAuthenticated = catchAsyncError(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }
  const decode = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await shopModel.findById(decode.id);
  next();
});
