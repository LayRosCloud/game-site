const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const GameGenreEntity = sequelize.define('gameGenre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
});

module.exports = GameGenreEntity;