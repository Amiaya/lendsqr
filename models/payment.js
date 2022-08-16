'use strict';
const {
  Model
} = require('sequelize');
const { id } = require('../validator/signupValidator');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    amount: {
      type:DataTypes.INTEGER
    },
    Time:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: id
      }
    },
    description: {
      type: DataTypes.STRING
    },
    balance:{
      type: DataTypes.INTEGER
    },
    from: {
      type: DataTypes.STRING
    },
    to: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Payment',
    timestamps: false
  });
  return Payment;
};