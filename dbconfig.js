import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '12113ayuk',
    database: 'journal',
    port: 5432,
});

client.connect()
  .then(() => {
    console.log('Connected to the database');

    client.query('SELECT * FROM journal_entries')
      .then((result) => {
        const jsonData = JSON.stringify(result.rows);
        console.log(jsonData);
      })
      .catch((error) => {
        console.error('Error executing SELECT query:', error);
      });
    })

    export default client

 