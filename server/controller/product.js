const express = require("express");
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const shopModel = require("../model/shop");
const productModel = require("../model/product");
const {
  isSellerAuthenticated,
  isAuthenticated,
} = require("../middleware/auth");
const fs = require("fs");
const orderModel = require("../model/order");
const router = express.Router();

//create product

router.post(
  "/create-product",
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
        const productData = req.body;
        productData.image = imageUrls;
        productData.shop = shop;

        const product = await productModel.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//get all product of a particular vendor based on id
router.get(
  "/getAllProductsShop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await productModel.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product from a shop
router.delete(
  "/delete-product-from-shop/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await productModel.findById(productId);
      productData.image.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
      const product = await productModel.findByIdAndDelete(productId);
      if (!product) {
        return next(new ErrorHandler("Product is not found with this Id", 500));
      }
      res.status(201).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    try {
      const allProducts = await productModel.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        allProducts,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//create new reviews
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      const product = await productModel.findById(productId);
      const review = {
        user,
        rating,
        comment,
        productId,
      };
      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );
      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id == req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.ratings = avg / product.reviews.length;
      await product.save({ validateBeforeSave: false });
      await orderModel.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        {
          arrayFilters: [{ "elem._id": productId }],
          new: true,
        }
      );

      res.status(201).json({
        success: true,
        message: "Reviewed successful",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
