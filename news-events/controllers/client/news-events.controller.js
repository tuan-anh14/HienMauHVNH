const New = require("../../model/news.model");

module.exports.index = async (req, res) => {
    try {
        const news = await New.find({
            status: "active",
            deleted: false
        });
        res.render("client/news-events", {
            pageTitle: "Tin tức - Sự kiện",
            news: news
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).send("Internal Server Error");
    }
};
