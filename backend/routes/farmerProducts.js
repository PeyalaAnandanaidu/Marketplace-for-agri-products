const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Farmer-only routes
router.post("/", protect, authorize("farmer"), addProduct);
router.put("/:id", protect, authorize("farmer"), updateProduct);
router.delete("/:id", protect, authorize("farmer"), deleteProduct);

module.exports = router;