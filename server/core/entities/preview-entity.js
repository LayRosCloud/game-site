const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const PreviewEntity = sequelize.define('preview', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    url: {type: DataTypes.STRING, allowNull: false, unique: true},
}, {timestamps: false});

module.exports = PreviewEntity;