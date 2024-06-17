const express = require("express");
const route =express.Router()

route.get("/", (req,res) => {
  res.render("client/news-events")
})

module.exports = route