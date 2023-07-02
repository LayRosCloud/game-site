const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const LinkEntity = sequelize.define('link', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    url: {type: DataTypes.STRING, allowNull: false, unique: true},
});

module.exports = LinkEntity;