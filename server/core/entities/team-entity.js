const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TeamEntity = sequelize.define('team', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
});

module.exports = TeamEntity;