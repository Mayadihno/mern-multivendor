const mongoose = require("mongoose");

const coupounSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupoun code name"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  selected: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const coupounModel = mongoose.model("CoupounCode", coupounSchema);
module.exports = coupounModel;
