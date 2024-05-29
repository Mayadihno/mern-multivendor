const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const {
  isAuthenticated,
  isSellerAuthenticated,
} = require("../middleware/auth");
const orderModel = require("../model/order");
const productModel = require("../model/product");
const shopModel = require("../model/shop");
const router = express.Router();

//create new order
router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, totalPrice, user, paymentInfo } = req.body;

      //group cart item by shopId
      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }
      //create orders for each shop
      const orders = [];
      for (const [shopId, item] of shopItemsMap) {
        const order = await orderModel.create({
          cart: item,
          shippingAddress,
          totalPrice,
          user,
          paymentInfo,
        });
        orders.push(order);
      }
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all orders for a user
router.get(
  "/get-user-orders/:userId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await orderModel
        .find({ "user._id": req.params.userId })
        .sort({
          createdAt: -1,
        });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all orders for seller
router.get(
  "/get-seller-orders/:shopId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await orderModel
        .find({ "cart.shopId": req.params.shopId })
        .sort({
          createdAt: -1,
        });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update status for seller
router.put(
  "/update-order-status/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const orderId = await orderModel.findById(req.params.id);
      if (!orderId) {
        return next(new ErrorHandler("Order not found with this Id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        orderId.cart.forEach(async (i) => {
          await updateOrder(i._id, i.qty);
        });
      }

      orderId.status = req.body.status;

      if (req.body.status === "Delivered") {
        orderId.deliveredAt = Date.now();
        orderId.paymentInfo.status = "Success";
      }
      orderId.save({ validateBeforeSave: false });
      res.status(201).json({
        success: true,
        orderId,
      });
      async function updateOrder(id, qty) {
        const product = await productModel.findById(id);
        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await orderModel.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// update order status for seller
router.put(
  "/update-order-status/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await orderModel.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await productModel.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await shopModel.findById(req.seller.id);

        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
