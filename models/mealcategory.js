'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      MealCategory.belongsTo(models.Restaurant)
      MealCategory.hasMany(models.Meal)
    }
  };
  MealCategory.init({
    RestaurantId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MealCategory',
  });
  return MealCategory;
};