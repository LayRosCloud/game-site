const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TypeReleaseEntity = sequelize.define('typeRelease', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

module.exports = TypeReleaseEntity;