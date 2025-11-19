const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

// Home Page → list of news
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const news = response.data;

    res.render("news", { news });
  } catch (err) {
    console.log("NEWS ERROR:", err.message);
    res.send("Error fetching news");
  }
});

// Detail Page → single article
app.get("/news/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${req.params.id}`
    );
    const article = response.data;

    res.render("detail", { article });
  } catch (err) {
    console.log("DETAIL ERROR:", err.message);
    res.send("Error loading article");
  }
});

// Start server
app.listen(4000, () =>
  console.log("Vulnerable News website running at http://localhost:4000")
);
