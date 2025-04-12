const oracledb = require('oracledb');
require('dotenv').config();

async function testarConexao() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    console.log('✅ Conectado com sucesso ao banco Oracle!');
    await connection.close();
  } catch (err) {
    console.error('❌ Erro ao conectar no Oracle:', err);
  }
}

testarConexao();
