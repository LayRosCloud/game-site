const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const GameEntity = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.TEXT, allowNull: false},
    developer: {type: DataTypes.STRING, allowNull: false},
    publisher: {type: DataTypes.STRING, allowNull: false},
    urlDownload: {type: DataTypes.STRING, allowNull: false},
});

module.exports = GameEntity;