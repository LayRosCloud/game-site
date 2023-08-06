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
const DeveloperEntity = require('./entities/developer-entity')
const PublisherEntity = require('./entities/publisher-entity')
const PublisherGameEntity = require('./entities/publisher-game-entity')
const DeveloperGameEntity = require('./entities/developer-game-entity')
const PublisherUserEntity = require('./entities/publisher-user-entity')
const RequestEntity = require('./entities/request-entity')
const TeamEntity = require('./entities/team-entity')
const RequestPublisherEntity = require('./entities/request-publisher-entity')
const PurchasedGameEntity = require('./entities/purchased-game-entity')
const FriendEntity = require('./entities/friends-entity')

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

DeveloperEntity.hasMany(GameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
GameEntity.belongsTo(DeveloperEntity)

PublisherEntity.hasMany(GameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
GameEntity.belongsTo(PublisherEntity)

DeveloperEntity.hasMany(DeveloperGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
DeveloperGameEntity.belongsTo(DeveloperEntity)

UserEntity.hasMany(DeveloperGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
DeveloperGameEntity.belongsTo(UserEntity)

UserEntity.hasMany(PublisherUserEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PublisherUserEntity.belongsTo(UserEntity)

PublisherEntity.hasMany(PublisherUserEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PublisherUserEntity.belongsTo(PublisherEntity)

UserEntity.hasMany(TeamEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
TeamEntity.belongsTo(UserEntity)

DeveloperEntity.hasMany(TeamEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
TeamEntity.belongsTo(DeveloperEntity);

UserEntity.hasMany(RequestEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
RequestEntity.belongsTo(UserEntity);

DeveloperEntity.hasMany(RequestEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
RequestEntity.belongsTo(DeveloperEntity);

GameEntity.hasMany(PublisherGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PublisherGameEntity.belongsTo(GameEntity)

PublisherEntity.hasMany(PublisherGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
PublisherGameEntity.belongsTo(PublisherEntity)

UserEntity.hasMany(RequestPublisherEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
RequestPublisherEntity.belongsTo(UserEntity)

PublisherEntity.hasMany(RequestPublisherEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
RequestPublisherEntity.belongsTo(PublisherEntity)

UserEntity.hasMany(PurchasedGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
PurchasedGameEntity.belongsTo(UserEntity)

GameEntity.hasMany(PurchasedGameEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}});
PurchasedGameEntity.belongsTo(GameEntity)

UserEntity.hasMany(FriendEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false}})
FriendEntity.belongsTo(UserEntity)

UserEntity.hasMany(FriendEntity, {onDelete: 'CASCADE', foreignKey: {allowNull: false, name:'toUserId'}})
FriendEntity.belongsTo(UserEntity)

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
    UserEntity,
    PublisherEntity,
    PublisherUserEntity,
    PublisherGameEntity,
    DeveloperEntity,
    DeveloperGameEntity,
    TeamEntity,
    RequestEntity,
    RequestPublisherEntity,
    PurchasedGameEntity
}