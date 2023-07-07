const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const CommentsEntity = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    content: {type: DataTypes.TEXT, allowNull: false},
    isModerated: {type: DataTypes.BOOLEAN, defaultValue: '0'},
    isReview: {type: DataTypes.BOOLEAN, defaultValue: '0'}
}, {createdAt: 'createdDate'});

module.exports = CommentsEntity;