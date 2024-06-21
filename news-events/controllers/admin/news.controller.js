const mongoose = require("mongoose");
const New = require("../../model/news.model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

//[GET] /admin/news
module.exports.news = async (req, res) => {
  const filterStatus = filterStatusHelpers(req.query);

  let find = { deleted: false };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Pagination
  const countNews = await New.countDocuments(find);

  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countNews
  );
  // End Pagination

  const news = await New.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/news/index.pug", {
    pageTitle: "Trang danh sách tin tức",
    news: news,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

//[PATCH] /admin/news/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id.trim();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid ObjectId");
    return res.redirect("back");
  }

  await New.updateOne({ _id: id }, { status });

  req.flash("success", "Cập nhật trạng thái thành công!");
  res.redirect("back");
};

//[PATCH] /admin/news/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ").map((id) => id.trim());

  // Check for valid ObjectIds
  const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
  if (invalidIds.length > 0) {
    req.flash("error", `Invalid ObjectIds: ${invalidIds.join(", ")}`);
    return res.redirect("back");
  }

  switch (type) {
    case "active":
      await New.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} tin tức!`
      );
      break;

    case "inactive":
      await New.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} tin tức!`
      );
      break;

    case "delete-all":
      await New.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Đã xoá thành công ${ids.length} tin tức!`);
      break;

    case "change-position":
      try {
        for (const item of ids) {
          let [id, position] = item.split("-");
          position = parseInt(position);

          // Check if position is a valid number
          if (isNaN(position)) {
            req.flash("error", `Invalid position for id: ${id}`);
            return res.redirect("back");
          }

          await New.updateOne(
            { _id: id },
            {
              position: position,
            }
          );
        }
        req.flash("success", `Đổi vị trí thành công ${ids.length} tin tức!`);
        res.status(200).json({ message: "Position updated successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      req.flash("error", "Thao tác không hợp lệ!");
      break;
  }

  res.redirect("back");
};

//[DELETE] /admin/news/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id.trim();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid ObjectId");
    return res.redirect("back");
  }

  await New.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", `Đã xoá thành công tin tức!`);
  res.redirect("back");
};

//[GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/news/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

//[POST] /admin/news/create
module.exports.createPost = async (req, res) => {
  console.log(req.file);

  if (req.body.position === "") {
    const countProducts = await New.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.thumbnail = `/uploads/${req.file.filename}`;

  const news = new New(req.body);
  await news.save();

  res.redirect(`${systemConfig.prefixAdmin}/news`);
};
