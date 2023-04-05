'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class ParkingPlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      ParkingPlace.hasMany(models.ParkingSlot, {
        foreignKey: 'id',
    });
    }
  }
  ParkingPlace.init({
    city: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ParkingPlace',
    tableName:'parking_places',
    underscored: true
  });
  return ParkingPlace;
};