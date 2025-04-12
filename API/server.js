require('dotenv').config();
const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/gastos', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const result = await connection.execute(`SELECT * FROM GASTOS`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar dados' });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/salario', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const result = await connection.execute(`SELECT * FROM SALARIO`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar dados' });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/gastos', async (req, res) => {
  let connection;

  try {
    console.log(req.body);
    const { data, valor, descricao } = req.body;

    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(
      `INSERT INTO GASTOS (VALOR, descricao) VALUES (:valor, :descricao)`,
      [valor, descricao],
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Gasto inserido com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao inserir gasto' });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/salario', async (req, res) => {
  let connection;

  try {
    console.log(req.body);
    const {valor} = req.body;

    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(
      `INSERT INTO SALARIO (VALOR) VALUES (:valor)`,
      [valor],
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Salario inserido com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao inserir Salario' });
  } finally {
    if (connection) await connection.close();
  }
});

// Deletar todos os gastos
app.delete('/gastos', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(`DELETE FROM GASTOS`, [], { autoCommit: true });

    res.json({ message: 'Todos os gastos foram deletados com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar os gastos' });
  } finally {
    if (connection) await connection.close();
  }
});

// Deletar todos os salários
app.delete('/salario', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    await connection.execute(`DELETE FROM SALARIO`, [], { autoCommit: true });

    res.json({ message: 'Todos os salários foram deletados com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar os salários' });
  } finally {
    if (connection) await connection.close();
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

