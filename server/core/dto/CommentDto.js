module.exports = class CommentDto{
    constructor(comment, review) {
        this.id = comment.id;
        this.date = comment.date
        this.isModerated = comment.isModerated;
        this.gameId = comment.gameId;
        this.userId = comment.userId;
        this.game = comment.game;
        this.user = comment.user
        this.isReview = review !== null
    }

}