require("dotenv").config();

module.exports = {
    url: process.env.DATABASE_URL,
    config: {
        define: {
            dialect: "mysql",
            timezone: "-2:00",
            timestamp: true,
            underscored: true
        }
    },
}