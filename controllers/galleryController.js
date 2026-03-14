const Gallery = require("../models/Gallery");

// GET all gallery items
// Also supports filtering by category: GET /api/gallery?category=Afrika
const getAllGallery = async (req, res) => {
  try {
    const filter = {};

    // if ?category=Afrika is passed, filter by it
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// GET all unique categories (used to build the filter tabs)
const getCategories = async (req, res) => {
  try {
    const categories = await Gallery.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// GET single gallery item
const getGalleryById = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Gallery item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// POST create gallery item
const createGallery = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const item = new Gallery({
      title,
      category,
      image: req.file.filename,
    });

    await item.save();
    res.status(201).json({ message: "Gallery item created successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// PUT update gallery item
const updateGallery = async (req, res) => {
  try {
    const { title, category } = req.body;
    const updateData = { title, category };
    if (req.file) updateData.image = req.file.filename;

    const item = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!item) return res.status(404).json({ message: "Gallery item not found" });

    res.json({ message: "Gallery item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// DELETE gallery item
const deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Gallery item not found" });
    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = {
  getAllGallery,
  getCategories,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};
