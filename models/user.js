'use strict';
const { options } = require('joi');
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
const payment = require('./payment');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    Name: {
      type: DataTypes.STRING
    },
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    Password: {
      type: DataTypes.STRING
    },
    Account_No: {
      type: DataTypes.STRING
    },
    Balance: {
      type:DataTypes.INTEGER,
      defaultValue: 0
    },
    Pin:{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });


  User.beforeCreate(async (user, options) => {
    user.Password = await bcrypt.hash(user.Password, 12)
  })

  User.prototype.hashPin = async function(canidatePin) {
    this.Pin = await bcrypt.hash(canidatePin,10)
  }
  User.prototype.correctPassword = async function(canidatePassword){
    return await bcrypt.compare(canidatePassword,this.Password)
  }

  User.prototype.correctPin = async function(canidatePin){
    return await bcrypt.compare(canidatePin,this.Pin)
  }

  return User;
};