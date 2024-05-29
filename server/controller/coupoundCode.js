const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSellerAuthenticated } = require("../middleware/auth");
const shopModel = require("../model/shop");
const coupounModel = require("../model/coupounCode");
const router = express.Router();

router.post(
  "/create-coupoun-code",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    const name = req.body.name;
    try {
      const isCounpounCodeExist = await coupounModel.find({ name: name });
      if (isCounpounCodeExist.length !== 0) {
        return next(new ErrorHandler("Coupoun code already exist", 400));
      }
      const coupounCode = await coupounModel.create(req.body);
      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-all-coupon-codes/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await coupounModel.find({ shopId: req.seller.id });

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await coupounModel.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//get coupon code by name
router.get(
  "/get-coupon-value/:name",
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await coupounModel.findOne({ name: req.params.name });
      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
