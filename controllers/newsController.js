const News = require("../models/News");

// GET all news
const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ date: -1 }); // newest first
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// GET single news by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// POST create news
const createNews = async (req, res) => {
  try {
    const { title, description, category, date } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const news = new News({
      title,
      description,
      category,
      date,
      image: req.file.filename,
    });

    await news.save();
    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// PUT update news
const updateNews = async (req, res) => {
  try {
    const { title, description, category, date } = req.body;
    const updateData = { title, description, category, date };
    if (req.file) updateData.image = req.file.filename;

    const news = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!news) return res.status(404).json({ message: "News not found" });

    res.json({ message: "News updated successfully", news });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// DELETE news
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews };
