require('dotenv').config();
const oracledb = require('oracledb');

oracledb.initOracleClient(); // apenas se estiver usando cliente Oracle instalado

const getConnection = async () => {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
  });
};

module.exports = getConnection;
