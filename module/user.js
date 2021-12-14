module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "mobileNo",
        comment: "用户账号",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password",
        comment: "密码",
      },
      userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "userType",
        defaultValue: 0,
        comment: "用户类型",
      },
      qqCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "qqCode",
        comment: "qq号码",
      },
      qqEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "qqEmail",
        comment: "qq邮箱",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "phone",
        comment: "手机号",
      },
      github: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "github",
        comment: "github地址",
      },
      idiograph: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "idiograph",
        comment: "个人签名",
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
