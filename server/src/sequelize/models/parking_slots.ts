'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class ParkingSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      ParkingSlot.belongsTo(models.ParkingPlace,{ foreignKey:'p_id', targetKey: 'id'} )
    }
  }
  ParkingSlot.init({
    in_use:DataTypes.BOOLEAN,
    is_empty: DataTypes.BOOLEAN,
    size: DataTypes.STRING,
    floor_name: DataTypes.STRING,
    slot_number: DataTypes.STRING,
    p_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parking_places',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'ParkingSlot',
    tableName: 'parking_slots',
    underscored: true
  });
  return ParkingSlot;
};