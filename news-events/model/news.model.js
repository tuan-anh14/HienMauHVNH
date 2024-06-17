const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
      title: String,
      description: String,
      thumbnail: String,
      status: String,
      position: Number,
      deleted: false
}
)

  
  const New = mongoose.model("New", newsSchema, "news");
  
  module.exports = New;
  