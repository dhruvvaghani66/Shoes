"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middlewares/authMiddleware.js");

var _createProductController = require("../controllers/createProductController.js");

var _expressFormidable = _interopRequireDefault(require("express-formidable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //routes
// create product


router.post('/create-product', _authMiddleware.requireSignIn, _authMiddleware.isAdmin, (0, _expressFormidable["default"])(), _createProductController.createProductController); // update product

router.put("/update-product/:pid", _authMiddleware.requireSignIn, _authMiddleware.isAdmin, (0, _expressFormidable["default"])(), _createProductController.updateProductController); // get products

router.get('/get-product', _createProductController.getProductController); // single product

router.get('/get-product/:slug', _createProductController.getSingleProductController); //get photo

router.get('/product-photo/:pid', _createProductController.productPhotoController); // delete product

router["delete"]('/delete-product/:pid', _authMiddleware.requireSignIn, _authMiddleware.isAdmin, _createProductController.deleteProductController);
var _default = router;
exports["default"] = _default;