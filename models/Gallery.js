const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title:    { type: String, required: true },   // shown on image hover
    image:    { type: String, required: true },   // uploaded image filename
    category: { type: String, required: true },   // e.g. "Fələstin", "Afrika"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
