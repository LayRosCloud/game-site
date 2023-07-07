const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TypeBlogEntity = sequelize.define('typeBlog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
}, {timestamps: false});

module.exports = TypeBlogEntity;