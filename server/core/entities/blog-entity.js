const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const BlogEntity = sequelize.define('blog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    preview: {type: DataTypes.STRING, allowNull: false},
    isModerated: {type: DataTypes.BOOLEAN, defaultValue: '0'}
});

module.exports = BlogEntity;