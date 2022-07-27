const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group_movies', {
    group_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    character_rel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'characters',
        key: 'character_id'
      }
    },
    peli_rel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'peliculas_series',
        key: 'pelis_id'
      }
    }
  }, {
    sequelize,
    tableName: 'group_movies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "group_movies_pkey",
        unique: true,
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
};
