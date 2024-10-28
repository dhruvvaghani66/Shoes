import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // slug is used to make SEO frendly website
  // slugify is a library  and is used to convert strings into URL-friendly slugs by removing special characters and replacing spaces.
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,

  },
  shipping: {
    type: Boolean,
    // default: false,
  },
  // timestamps: true, // automatically adds createdAt and updatedAt fields
}, {
  timestamps: true
})

export default mongoose.model("Products", productSchema);