//app/api/signup.js

const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, role } = req.body;

    try {
      await db.connect();
      await db.query`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          role TEXT,
          password TEXT NOT NULL
        )
      `);

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertedUser = await db.query`
        INSERT INTO users (id, name, role, email, password)
        VALUES (uuid_generate_v4(), ${username}, ${role}, ${email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING
        RETURNING 
      `;

      console.log('User registered successfully:', insertedUser.rows[0]);

      return res.status(200).json({ success: true, user: insertedUser.rows[0] || {} });
    } catch (error) {
      console.error('Error registering user:', error);

      return res.status(500).json({ success: false, error: error.message });
    } finally {
      await db.end();
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
