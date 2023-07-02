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

RoleEntity.hasMany(UserEntity);
UserEntity.belongsTo(RoleEntity);

UserEntity.hasMany(TokenEntity);
TokenEntity.belongsTo(UserEntity);

TypeReleaseEntity.hasMany(GameEntity);
GameEntity.belongsTo(TypeReleaseEntity);

CommentEntity.hasOne(ReviewEntity);
ReviewEntity.belongsTo(CommentEntity);

BlogEntity.hasMany(ContentGameEntity);
ContentGameEntity.belongsTo(BlogEntity);

TypeContentEntity.hasMany(ContentGameEntity);
ContentGameEntity.belongsTo(TypeContentEntity);

GameEntity.belongsToMany(TypeBlogEntity, {through: BlogEntity});
TypeBlogEntity.belongsToMany(GameEntity, {through: BlogEntity});

GameEntity.belongsToMany(GenreEntity, {through: GameGenreEntity});
GenreEntity.belongsToMany(GameEntity, {through: GameGenreEntity});

GameEntity.belongsToMany(UserEntity, {through: CommentEntity});
UserEntity.belongsToMany(GameEntity, {through: CommentEntity});

GameEntity.belongsToMany(TypeContentEntity, {through: PreviewEntity});
TypeContentEntity.belongsToMany(GameEntity, {through: PreviewEntity});

GameEntity.belongsToMany(TypeServiceEntity,{through:LinkEntity});
TypeServiceEntity.belongsToMany(GameEntity,{through:LinkEntity});

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