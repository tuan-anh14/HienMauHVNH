const paginationHelper = require("../../helpers/pagination");


function toggleDetails(id) {
    var details = document.getElementById(id);
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}

// Assuming this is within an asynchronous function
const countNews = await New.countDocuments(find);

const objectPagination = paginationHelper({
  currentPage: 1,
  limitItems: 4,
}, req.query, countNews);

res.render('client/news-events', { news: newsData, pagination: objectPagination });