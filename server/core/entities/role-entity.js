const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const RoleEntity = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
}, {timestamps: false});

module.exports = RoleEntity;