module.exports = class UserProfileDto{
    constructor(user) {
        this.id = user.id;
        this.avatarImage = user.avatarImage;
        this.status = user.status;
        this.dateRegistration = user.dateRegistration;
        this.roleId = user.roleId;
        this.link = user.link
        this.name = user.name
        this.isBanned = user.isBanned;
        this.role = user.role
    }
}