const Sequelize = require('sequelize')
const { Op } = require("sequelize") // Necessário para filtros where. 

const connection = new Sequelize('guiapress', 'root', '',
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
)

module.exports = connection

