const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const conversationModel = require("../model/conversation");
const {
  isSellerAuthenticated,
  isAuthenticated,
} = require("../middleware/auth");
const router = express.Router();

//create a new conversation
router.post(
  "/create-new-conversation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
      const isConversationExist = await conversationModel.findOne({
        groupTitle,
      });
      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await conversationModel.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });
        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get seller conversation
router.get(
  "/get-all-conversation-seller/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await conversationModel
        .find({
          members: {
            $in: [req.params.id],
          },
        })
        .sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);
// get user conversations
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await conversationModel
        .find({
          members: {
            $in: [req.params.id],
          },
        })
        .sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);
// update the last message
router.put(
  "/update-last-message/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await conversationModel.findByIdAndUpdate(
        req.params.id,
        {
          lastMessage,
          lastMessageId,
        }
      );

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);
module.exports = router;
