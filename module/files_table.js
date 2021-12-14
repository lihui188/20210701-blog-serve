module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "files",
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
        comment: "文件名",
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "path",
        comment: "磁盘路径",
      },
      realName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "realName",
        comment: "文件真实名",
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "size",
        comment: "文件大小",
      },
      suffix: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "suffix",
        comment: "文件后缀",
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "type",
        comment: "文件类型",
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
