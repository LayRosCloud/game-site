const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const RequestEntity = sequelize.define('request', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},

});
module.exports = RequestEntity;