const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const PublisherUserEntity = sequelize.define('publisherUser', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
});
module.exports = PublisherUserEntity;