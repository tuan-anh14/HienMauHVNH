const New = require("../../model/news.model");

module.exports.index = async (req, res) => {
  let find = {
    status: "active",
    deleted: false,
  };

  // Pagination
  let objectPagination = {
    currentPage: 1,
    limitItem: 4,
    totalPage: 0,
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  const countNews = await New.countDocuments(find);
  objectPagination.totalPage = Math.ceil(countNews / objectPagination.limitItem);

  const news = await New.find(find)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("client/news-events", {
    pageTitle: "Tin tức - Sự kiện",
    news: news,
    pagination: objectPagination,
  });
};

