const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const GenreEntity = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

module.exports = GenreEntity;