const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peliculas_series', {
    pelis_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calification: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'peliculas_series',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "peliculas_series_pkey",
        unique: true,
        fields: [
          { name: "pelis_id" },
        ]
      },
    ]
  });
};
