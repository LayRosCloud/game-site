module.exports = class UserDto{
    constructor(user) {
        this.id = user.id;
        this.login = user.login;
        this.email = user.email;
        this.avatarImage = user.avatarImage;
        this.dateRegistration = user.createdAt;
        this.roleId = user.roleId;
        this.isActivated = user.isActivated;
        this.isBanned = user.isBanned;
        this.role = user.role
    }
}