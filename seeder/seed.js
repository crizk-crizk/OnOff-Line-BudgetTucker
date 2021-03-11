const mongoose = require("mongoose");
const Transaction = require("../models/transaction.js");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const budgetSeed = [
  {
    name: "Groceries",
    value: -50,
    date: new Date(Date.now()),
  },
  {
    name: "Coffee",
    value: -20,
    date: new Date(Date.now()),
  },
  {
    name: "Tenant Rent",
    value: 1200,
    date: new Date(Date.now()),
  },
];
Transaction.deleteMany({})
  .then(() => Transaction.collection.insertMany(budgetSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
