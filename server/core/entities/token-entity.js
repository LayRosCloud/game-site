const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TokenEntity = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    refreshToken: {type: DataTypes.TEXT, length: 500, allowNull: false},
});

module.exports = TokenEntity;