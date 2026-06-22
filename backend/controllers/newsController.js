const axios = require("axios");

// =======================================
// GET LIVE NEWS (CATEGORY + STABLE VERSION)
// =======================================

const getNews = async (req, res) => {
  try {
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "GNews API key missing in .env file",
      });
    }

    // CATEGORY FROM QUERY PARAM
    const category = req.query.category || "kashmir";

    let query = "Kashmir";

    switch (category.toLowerCase()) {
      case "kashmir":
        query = "Kashmir";
        break;

      case "pakistan":
        query = "Pakistan";
        break;

      case "world":
        query = "World news";
        break;

      case "trending":
        query = "breaking news";
        break;

      default:
        query = "Kashmir";
    }

    // SINGLE SAFE REQUEST (prevents API blocking)
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        query
      )}&lang=en&max=10&apikey=${apiKey}`
    );

    const articles = response.data?.articles || [];

    // SAFE MAPPING (prevents frontend crash)
    const cleaned = articles.map((article, index) => ({
      _id: index,
      title: article.title || "No Title",
      description: article.description || "No description available",
      image: article.image || "",
      url: article.url || "",
      source: article.source?.name || "News",
      publishedAt: article.publishedAt || new Date(),
      category: category,
    }));

    return res.status(200).json(cleaned);

  } catch (error) {
    console.log(
      "GNews Error:",
      error.response?.data || error.message
    );

    // IMPORTANT: never break frontend
    return res.status(200).json([]);
  }
};

// =======================================
// CREATE NEWS (ADMIN)
// =======================================

const createNews = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    const news = await require("../models/News").create({
      title,
      description,
      image,
      category,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================================
// DELETE NEWS (ADMIN)
// =======================================

const deleteNews = async (req, res) => {
  try {
    const News = require("../models/News");

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    await news.deleteOne();

    res.json({
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNews,
  createNews,
  deleteNews,
};