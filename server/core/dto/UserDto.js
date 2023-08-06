const UserProfileDto = require("./UserProfileDto");
module.exports = class UserDto extends UserProfileDto{
    constructor(user) {
        super(user);
        this.login = user.login;
        this.email = user.email;
        this.isActivated = user.isActivated;
    }
}