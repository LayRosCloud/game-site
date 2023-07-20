const BlogEntity = require('./entities/blog-entity')
const CommentEntity = require('./entities/comments-entity')
const ContentGameEntity = require('./entities/content-game-entity')
const GameEntity = require('./entities/game-entity')
const GameGenreEntity = require('./entities/game-genre-entity')
const GenreEntity = require('./entities/genre-entity')
const LinkEntity = require('./entities/link-entity')
const PreviewEntity = require('./entities/preview-entity')
const ReviewEntity = require('./entities/review-entity')
const RoleEntity = require('./entities/role-entity')
const TokenEntity = require('./entities/token-entity')
const TypeBlogEntity = require('./entities/type-blog-entity')
const TypeContentEntity = require('./entities/type-content-entity')
const TypeReleaseEntity = require('./entities/type-release-entity')
const TypeServiceEntity = require('./entities/type-service-entity')
const UserEntity = require('./entities/user-entity')

RoleEntity.hasMany(UserEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
UserEntity.belongsTo(RoleEntity);

UserEntity.hasMany(TokenEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
TokenEntity.belongsTo(UserEntity);

TypeReleaseEntity.hasMany(GameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
GameEntity.belongsTo(TypeReleaseEntity);

CommentEntity.hasOne(ReviewEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
ReviewEntity.belongsTo(CommentEntity);

BlogEntity.hasMany(ContentGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
ContentGameEntity.belongsTo(BlogEntity);

TypeContentEntity.hasMany(ContentGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
ContentGameEntity.belongsTo(TypeContentEntity);

GameEntity.hasMany(BlogEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
BlogEntity.belongsTo(GameEntity);

TypeBlogEntity.hasMany(BlogEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
BlogEntity.belongsTo(TypeBlogEntity);

GameEntity.hasMany(GameGenreEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
GameGenreEntity.belongsTo(GameEntity);

GenreEntity.hasMany(GameGenreEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
GameGenreEntity.belongsTo(GenreEntity);

GameEntity.hasMany(CommentEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
CommentEntity.belongsTo(GameEntity);
UserEntity.hasMany(CommentEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
CommentEntity.belongsTo(UserEntity);

GameEntity.hasMany(PreviewEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
PreviewEntity.belongsTo(GameEntity);

GameEntity.hasMany(LinkEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
LinkEntity.belongsTo(GameEntity);
TypeServiceEntity.hasMany(LinkEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
LinkEntity.belongsTo(TypeServiceEntity);

ReviewEntity.afterCreate('creatingReviewComment', async (review, options) => {
    await CommentEntity.update({isReview: true}, {where: {id: review.commentId}})
})

module.exports = {
    BlogEntity,
    CommentEntity,
    ContentGameEntity,
    GameEntity,
    GameGenreEntity,
    GenreEntity,
    LinkEntity,
    PreviewEntity,
    ReviewEntity,
    RoleEntity,
    TokenEntity,
    TypeBlogEntity,
    TypeContentEntity,
    TypeReleaseEntity,
    TypeServiceEntity,
    UserEntity
}