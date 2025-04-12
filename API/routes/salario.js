const express = require('express');
const router = express.Router();
const getConnection = require('../database');

router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute('SELECT * FROM SALARIOS');
    res.json(result.rows);
    await conn.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
