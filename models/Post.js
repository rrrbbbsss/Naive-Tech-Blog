const { Model, DataTypes } = require("sequelize");
const dbconn = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // make sure it has some content
        len: [1],
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // make sure it has some content
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize: dbconn,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
