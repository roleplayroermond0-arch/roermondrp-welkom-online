import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'your_username',
  password: process.env.MYSQL_PASSWORD || 'your_password',
  database: process.env.MYSQL_DATABASE || 'roermondRP',
  port: parseInt(process.env.MYSQL_PORT || '3306')
});

export default connection;