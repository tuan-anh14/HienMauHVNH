
const dashboardRoutes = require("../admin/dashboard.route")
const newRoutes = require("./news.route")
const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes)

    app.use(PATH_ADMIN + "/news", newRoutes)
}
