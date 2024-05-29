const express = require("express");
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const productModel = require("../model/product");
const { isSellerAuthenticated } = require("../middleware/auth");
const eventModel = require("../model/event");
const shopModel = require("../model/shop");
const fs = require("fs");
const router = express.Router();

//create product
router.post(
  "/create-event-product",
  upload.array("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await shopModel.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is Invalid", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.image = imageUrls;
        eventData.shop = shop;

        const event = await eventModel.create(eventData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//get all event of a particular vendor based on id
router.get(
  "/getAllEventShop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await eventModel.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get("/get-all-events", async (req, res, next) => {
  try {
    const allEvents = await eventModel.find();

    res.status(201).json({
      success: true,
      allEvents,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// delete product from a shop
router.delete(
  "/delete-event-from-shop/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const eventId = req.params.id;

      //   const event = await eventModel.findByIdAndDelete(eventId);
      const eventData = await eventModel.findById(eventId);
      eventData.image.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
      const event = await eventModel.findByIdAndDelete(eventId);
      if (!event) {
        return next(new ErrorHandler("Event is not found with this Id", 500));
      }
      res.status(201).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
