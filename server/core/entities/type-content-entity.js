const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const TypeContentEntity = sequelize.define('typeContent', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

module.exports = TypeContentEntity;