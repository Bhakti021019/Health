const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0; // At least 1 tag
        },
        message: "At least one tag is required",
      },
    },
    json_file_url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Session", sessionSchema);
