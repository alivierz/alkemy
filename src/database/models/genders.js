const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('genders', {
    genders_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "image"
    }
  }, {
    sequelize,
    tableName: 'genders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "genders_pkey",
        unique: true,
        fields: [
          { name: "genders_id" },
        ]
      },
    ]
  });
};
