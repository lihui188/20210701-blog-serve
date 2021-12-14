module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "classifies",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "name",
          comment: "分类名称",
        },
        alias: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "alias",
          comment: "分类别名",
        },
      },
      {
        timestamps: false,
      }
    )
  }
  