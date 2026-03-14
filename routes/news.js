const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

router.get("/",      getAllNews);
router.get("/:id",   getNewsById);
router.post("/create",     upload.single("image"), createNews);
router.put("/edit/:id",   upload.single("image"), updateNews);
router.delete("/delete/:id", deleteNews);

module.exports = router;
