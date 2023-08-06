const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const PublisherGameEntity = sequelize.define('publisherGame', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
});
module.exports = PublisherGameEntity;