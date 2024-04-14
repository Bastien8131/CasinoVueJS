const mysql = require('mysql');

// Création de la connexion à la base de données
const connection = mysql.createConnection({
    host: 'androcode.fr',
    user: 'casino',
    password: 'Ae87#p3w4',
    database: 'casino'
});

module.exports = {
    connection: connection,
}
