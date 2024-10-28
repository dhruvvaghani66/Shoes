import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  // slug is used to make SEO frendly website
  // slugify is a library  and is used to convert strings into URL-friendly slugs by removing special characters and replacing spaces.
  slug: {
    type: String,
    lowercase: true,
  },
  // products: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Product",
  // }, ],
})


export default mongoose.model("Category", categorySchema);