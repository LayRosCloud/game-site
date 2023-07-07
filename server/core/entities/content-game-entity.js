const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const ContentGameEntity = sequelize.define('contentGame', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    content: {type: DataTypes.TEXT, allowNull: false},
});

module.exports = ContentGameEntity;