const { Sequelize } = require('sequelize');
const config = require('./database')

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
  
    // Z here means current timezone, _not_ UTC
    // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
  };

const connection = new Sequelize(config);

module.exports = connection;