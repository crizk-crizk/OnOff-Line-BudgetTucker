const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
