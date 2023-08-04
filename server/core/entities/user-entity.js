const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const UserEntity = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    login: {type: DataTypes.STRING, length: 32, allowNull: false, unique: true},
    status: {type: DataTypes.STRING, length: 100},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, length: 255, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: '0'},
    activationLink: {type: DataTypes.STRING, allowNull: false},
    avatarImage: {type: DataTypes.STRING, allowNull: true},
    link: {type: DataTypes.STRING, allowNull: false, unique: true},
    name: {type: DataTypes.STRING, allowNull: false},
    isBanned: {type: DataTypes.BOOLEAN, defaultValue: '0'}
}, {createdAt: 'dateRegistration'});
module.exports = UserEntity;