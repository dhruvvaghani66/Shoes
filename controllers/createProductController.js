import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from 'dotenv'

dotenv.config()

// payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Or Production
  // merchantId: 'mz6fndvdg6f85w7s',
  // publicKey: 'k8qkjf2dkw4z977f',
  // privateKey: '12476a2613ab10ea9454c7f0d41960ad',
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping
    } = req.fields;
    const {
      photo
    } = req.files;
    // validation 
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required"
        });
      case !description:
        return res.status(500).send({
          error: "Description is Required"
        });
      case !price:
        return res.status(500).send({
          error: "Price is Required"
        });
      case !category:
        return res.status(500).send({
          error: "Category is Required"
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is Required"
        });
      case photo && photo.size > 10000000:
        return res.status(500).send({
          error: "Photo is Required and should be les then 1 mb"
        });
    }
    const products = new productModel({
      ...req.fields,
      slug: slugify(name)
    })
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      products
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in creating product"
    });
  }
}



// getProductController
export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({
      createdAt: -1
    })

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};


// getSingleProductController
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({
      slug: req.params.slug
    }).select("-photo").populate('category')

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Get Single Product Successfully",
      product,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error: error.message,
    });
  }
};


// productPhotoController
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo")

    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data); // Send the photo data directly
    }

    // If no photo data is available, you might want to send a placeholder response or a 404 status
    res.status(404).send({
      message: "No photo found for this product"
    });
    // res.send(product.photo.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product photo",
      error: error.message,
    });
  }
};


// deleteProductController
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error: error.message,
    });
  }
};


// updateProductController
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,

      quantity,
      shipping

    } =
    req.fields;
    const {
      photo
    } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is Required"
        });
      case !description:
        return res.status(500).send({
          error: "Description is Required"
        });
      case !price:
        return res.status(500).send({
          error: "Price is Required"
        });
      case !category:
        return res.status(500).send({
          error: "Category is Required"
        });
      case !quantity:
        return res.status(500).send({
          error: "Quantity is Required"
        });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({
            error: "photo is Required and should be less then 1mb"
          });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid, {
        ...req.fields,
        slug: slugify(name)
      }, {
        new: true
      }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};


//productFiltersController
export const productFiltersController = async (req, res) => {
  try {
    const {
      checked,
      radio
    } = req.body
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = {
      $gte: radio[0],
      $lte: radio[1]
    };
    const products = await productModel.find(args)

    res.status(200).send({
      success: true,
      // countTotal: products.length,
      // message: "Products fetched successfully",
      products,
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in fetching products",
      error,
    });
  }
};


//productCountController
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount()

    res.status(200).send({
      success: true,
      message: "Product Count fetched successfully",
      total,
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in fetching product count",
      error,
    });
  }
};


//productListController
export const productListController = async (req, res) => {
  try {
    // per page product show
    const perPage = 6
    const page = req.params.page ? req.params.page : 1

    const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({
      createdAt: -1
    })

    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
      // currentPage: page,
      // totalPages: Math.ceil(total / limit),
      // totalCount: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page  products",
      error,
    });
  }
}

// searchProductController.js
export const searchProductController = async (req, res) => {
  try {
    const {
      keyword
    } = req.params;

    const results = await productModel.find({
      $or: [{
          name: {
            $regex: keyword,
            $options: 'i'
          }, // Case-insensitive search
        },
        {
          description: {
            $regex: keyword,
            $options: 'i'
          }, // Case-insensitive search
        }
      ]
    }).select("-photo");

    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      results, // Ensure `results` is sent back
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in searching products api",
      error,
    });
  }
};


//similar || relatedProductController
export const realtedProductController = async (req, res) => {
  try {
    const {
      pid,
      cid
    } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: {
          $ne: pid
        },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};


// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      slug: req.params.slug
    });
    const products = await productModel.find({
      category
    }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


//payement gateway API || braintreeTokenController
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};


//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const {
      nonce,
      cart
    } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    gateway.transaction.sale({
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (error) {
          return res.status(500).send(error); // Send response for error
        }

        if (result) {
          try {
            const order = await new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();

            return res.json({
              ok: true
            }); // Send response for success
          } catch (orderError) {
            return res.status(500).send(orderError); // Handle order saving error
          }
        } else {
          return res.status(500).send({
            error: "Payment failed"
          }); // Handle case where payment fails
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Payment processing failed",
      error: error.message,
    });
  }
};