module.exports = class UserDto{
    constructor(user) {
        this.id = user.id;
        this.login = user.login;
        this.email = user.email;
        this.avatarImage = user.avatarImage;
        this.dateRegistration = user.createdAt;
        this.roleId = user.roleId;
        this.role = user.role
    }
}