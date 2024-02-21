
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/database_name');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post('/api/signup', async (req, res) => {
    const { username, password, role } = req.body;

    try {

      const result = await db.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *', [username, password, role]);
      
      res.json({ success: true, user: result[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error al registrar el usuario' });
    }
  });


  server.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {

      const result = await db.one('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

      res.json({ success: true, user: result });
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, error: 'Invalid Credentials' });
    }
  });

  server.all('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
