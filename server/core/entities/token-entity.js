const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TokenEntity = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false},
    identityItem: {type: DataTypes.STRING, allowNull: false},
});

module.exports = TokenEntity;