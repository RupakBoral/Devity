const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      // ref is used to refer/link to another model
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["accepted", "pending", "rejected", "ignored", "interested"],
        message: `{value} is incorrect status`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexing
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

// this is like a middleware fn that will be called always before save fn is called
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //   check if user is sending request to itself
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    return res.status(404).send("You cannot send request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
