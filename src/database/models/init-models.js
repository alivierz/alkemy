var DataTypes = require("sequelize").DataTypes;
var _characters = require("./characters");
var _genders = require("./genders");
var _group_genders = require("./group_genders");
var _group_movies = require("./group_movies");
var _peliculas_series = require("./peliculas_series");
var _users = require("./users");

const Sequelize = require('sequelize');
require('dotenv').config()
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js');
const configObj = config[env]

let sequelize;

if (configObj.use_env_variable) {
  //process.env[configObj.use_env_variable]
  sequelize = new Sequelize(configObj.url, configObj);
} else {
  sequelize = new Sequelize(configObj.database, configObj.username, configObj.password, configObj);
}

function initModels() {
  var characters = _characters(sequelize, DataTypes);
  var genders = _genders(sequelize, DataTypes);
  var group_genders = _group_genders(sequelize, DataTypes);
  var group_movies = _group_movies(sequelize, DataTypes);
  var peliculas_series = _peliculas_series(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  group_movies.belongsTo(characters, { as: "character_rel_character", foreignKey: "character_rel"});
  characters.hasMany(group_movies, { as: "group_movies", foreignKey: "character_rel"});
  group_genders.belongsTo(genders, { as: "gender_rel_gender", foreignKey: "gender_rel"});
  genders.hasMany(group_genders, { as: "group_genders", foreignKey: "gender_rel"});
  group_genders.belongsTo(peliculas_series, { as: "peli_rel_peliculas_sery", foreignKey: "peli_rel"});
  peliculas_series.hasMany(group_genders, { as: "group_genders", foreignKey: "peli_rel"});
  group_movies.belongsTo(peliculas_series, { as: "peli_rel_peliculas_sery", foreignKey: "peli_rel"});
  peliculas_series.hasMany(group_movies, { as: "group_movies", foreignKey: "peli_rel"});

  return {
    characters,
    genders,
    group_genders,
    group_movies,
    peliculas_series,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
