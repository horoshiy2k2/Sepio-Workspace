
const mysql = require('mysql2/promise');

async function createUser() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'Main_user',
    password: 'Sepio_password'
  });

  try {
    await connection.execute('CREATE DATABASE IF NOT EXISTS nodejs_login;');
    await connection.execute('CREATE USER IF NOT EXISTS \'Main_user\'@\'localhost\' IDENTIFIED BY \'Sepio_password\';');
    await connection.execute('GRANT ALL PRIVILEGES ON nodejs_login.* TO \'Main_user\'@\'localhost\';');
    await connection.execute('FLUSH PRIVILEGES;');
    console.log('User created and privileges granted successfully.');
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    await connection.end();
  }
}

createUser().catch(console.error);
