const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const FriendsEntity = sequelize.define('friend', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    isAccept: {type: DataTypes.INTEGER, defaultValue: '0'}
});
module.exports = FriendsEntity;