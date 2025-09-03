import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'roermondRP'
});

export default connection;