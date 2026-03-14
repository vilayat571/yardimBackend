const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAllGallery,
  getCategories,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

// GET /api/gallery               → get all items (supports ?category=Afrika)
// GET /api/gallery/categories    → get all unique category names (for filter tabs)
// GET /api/gallery/:id           → get single item
// POST /api/gallery/create       → add new image
// PUT /api/gallery/edit/:id      → update image
// DELETE /api/gallery/delete/:id → delete image

router.get("/",                getAllGallery);
router.get("/categories",      getCategories);   // must be before /:id
router.get("/:id",             getGalleryById);
router.post("/create",         upload.single("image"), createGallery);
router.put("/edit/:id",        upload.single("image"), updateGallery);
router.delete("/delete/:id",   deleteGallery);

module.exports = router;
