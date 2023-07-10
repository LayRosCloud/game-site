const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const BlogEntity = sequelize.define('blog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT}
});

module.exports = BlogEntity;