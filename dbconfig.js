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
.then(() => console.log("Connected to the database on port 5000"))
.catch((err) => console.error(err));

export default client

 