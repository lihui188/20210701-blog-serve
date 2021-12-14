module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "articles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "title",
        comment: "标题",
      },
      describe: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "describe",
        comment: "描述",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "content",
        comment: "文章内容",
      },
      classId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "classId",
        comment: "分类id",
      },
      className:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "className",
        comment: "分类名称",
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "status",
        comment: "文章状态（1、草稿 2、发布 3、回收站）",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "createdAt",
        comment: "创建时间",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updatedAt",
        comment: "更新时间",
      },
    },
    {
      timestamps: false,
    }
  )
}
