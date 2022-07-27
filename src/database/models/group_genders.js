const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group_genders', {
    group_genders_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    peli_rel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'peliculas_series',
        key: 'pelis_id'
      }
    },
    gender_rel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'genders',
        key: 'genders_id'
      }
    }
  }, {
    sequelize,
    tableName: 'group_genders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "group_genders_pkey",
        unique: true,
        fields: [
          { name: "group_genders_id" },
        ]
      },
    ]
  });
};
