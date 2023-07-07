const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TypeServiceEntity = sequelize.define('typeService', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
}, {timestamps: false});

module.exports = TypeServiceEntity;