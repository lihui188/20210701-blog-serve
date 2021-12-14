module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "menu",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      parentId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "parent_id",
        comment: "菜单图标",
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "icon",
        comment: "菜单图标",
      },
      menuName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "menu_name",
        comment: "菜单名称",
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sort",
        comment: "排序",
      },
      isShow: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "is_show",
        defaultValue: false,
        comment: "是否显示",
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
