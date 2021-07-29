'use strict';
const {
  Model
} = require('sequelize');
const { encode } = require ( '../helpers/bcryptjs' )

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany ( models.Todo, { foreignKey: "UserId" } )
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is Required'
        },
        len: {
          args: [6, 22],
          msg: 'Password length is below 6 and 22 character'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: ( user, option ) => {
        user.password = encode ( user.password )
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};