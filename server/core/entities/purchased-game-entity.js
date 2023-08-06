const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const PurchasedGameEntity = sequelize.define('purchasedGame', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
});
module.exports = PurchasedGameEntity;