const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const GameEntity = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    preview: {type: DataTypes.STRING, allowNull: false},
    urlDownload: {type: DataTypes.STRING, allowNull: false},
    isModerated: {type: DataTypes.BOOLEAN, defaultValue: '0'}
});

module.exports = GameEntity;