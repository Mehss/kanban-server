'use strict';
const {hash} = require('../helpers/brcypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task, {foreignKey: "UserId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'email is already taken'
      },
      validate: {
        notEmpty: {msg: "Email cannot be empty"},
        isEmail: {msg: "Please use proper email format"}
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Password cannot be empty"},
        len: {
          args: [4, 32],
          msg: "Password must be between 4 to 32 characters"
        }
      }
    },
    alias: {
      type: DataTypes.STRING
    }
  }, {
    hooks:{
      beforeCreate: user =>{
        user.password = hash(user.password)
        user.email = user.email.toLowerCase()
        if (!user.alias) {user.alias = user.email}
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};