const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('characters', {
    character_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Anonymous"
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    history: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'characters',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "characters_pkey",
        unique: true,
        fields: [
          { name: "character_id" },
        ]
      },
    ]
  });
};
