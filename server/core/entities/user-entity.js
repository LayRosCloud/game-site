const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const UserEntity = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    login: {type: DataTypes.STRING, length: 32, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, length: 255, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: '0'},
    activationLink: {type: DataTypes.STRING, allowNull: false},
    avatarImage: {type: DataTypes.STRING, allowNull: true},
    isBanned: {type: DataTypes.BOOLEAN, defaultValue: '0'}
});
module.exports = UserEntity;