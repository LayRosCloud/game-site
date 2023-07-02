const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const ReviewEntity = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = ReviewEntity;