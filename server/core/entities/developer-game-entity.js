const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const DeveloperEntity = sequelize.define('developerGame', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
});
module.exports = DeveloperEntity;