const User = require('./models/user.js');
const {connection: co} = require('./config/db.js');
const cors = require('cors');
const express = require( 'express') ;
const http = require('http');
const socketIo = require('socket.io');

const app  = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:5173'
}));

const port = 5170;
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let socketId = '';


io.on('connection', (socket) => {
    socketId = socket.id;
    console.log('User connected', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected');
        let user = usersLoggued.find(u => u.socketId === socket.id);
        if(user){
            co.query('UPDATE data SET credit = ?, score = ? WHERE idU = ?', [user.credit, user.score, user.id], (err, result) => {
                if (err) {
                    res.send('error logout update');
                    console.error('error logout update');
                    return;
                }
            });
            usersLoggued.splice(usersLoggued.indexOf(user), 1);
        }
    });

    socket.on('login', (data, callback) => {
        let pseudo = data.pseudo;
        let email = data.email;

        if(pseudo === '' || email === '') {
            callback({message: 'empty field', value: null});
            return;
        }

        if(usersLoggued.find(u => u.pseudo === pseudo && u.email === email)) {
            callback({message: 'already connected', value: null});
            return;
        }

        co.query('SELECT * FROM vue_users vue_admins WHERE pseudo = ? AND email = ?', [pseudo, email], (err, result) => {
            if (err) {
                callback({message: 'error bdd', value: null});
                return;
            }
            if(result.length === 0) {
                callback({message: 'not found', value: null});
                return;
            }
            if(result.length > 1) {
                callback({message: 'too many', value: null});
                return;
            }
            if(result[0].bannie === 1) {
                callback({message: 'is banned', value: null});
                return;
            }
            if(result[0].admin === 1) {
                callback({message: 'is admin', value: null});
                return;
            }


            let user = new User(result[0].id, socket.id, result[0].pseudo, result[0].email, result[0].credit, result[0].score, result[0].bannie);
            usersLoggued.push(user);
            callback({message: 'success', value: user});
        });

    });

    socket.on('update', (data) => {
        let id = data.id;
        let credit = data.credit;
        let score = data.score;
        let user = usersLoggued.find(u => u.socketId === socket.id && u.id === id);
        usersLoggued.splice(usersLoggued.indexOf(user), 1);
        user.credit = credit;
        user.score = score;
        usersLoggued.push(user);

        console.log(usersLoggued);
    });

    socket.on('test', () => {
        console.log('test');
    });
});

let usersLoggued = [];


co.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }


    console.log('Connection established');

    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


// app.post('/login', (req, res) => {
//     // console.log(req.body.pseudo);
//     let pseudo = req.body.pseudo;
//     let email = req.body.email;
//
//     console.log(pseudo, email);
//     console.log(usersLoggued);
//
//     if(pseudo === '' || email === '') {
//         res.send({message: 'empty field', value: null});
//         return;
//     }
//
//     if(usersLoggued.find(u => u.pseudo === pseudo && u.email === email)) {
//         res.send({message: 'already connected', value: null});
//         return;
//     }
//
//     co.query('SELECT * FROM vue_users vue_admins WHERE pseudo = ? AND email = ?', [pseudo, email], (err, result) => {
//         if (err) {
//             res.send({message: 'error bdd', value: null});
//             return;
//         }
//         if(result.length === 0) {
//             res.send({message: 'not found', value: null});
//             return;
//         }
//         if(result.length > 1) {
//             res.send({message: 'too many', value: null});
//             return;
//         }
//         if(result[0].admin === 1) {
//             res.send({message: 'is admin', value: null});
//             return;
//         }
//
//         let user = new User(result[0].id, socketId, result[0].pseudo, result[0].email, result[0].credit, result[0].score);
//         usersLoggued.push(user);
//
//         res.send({message: 'success', value: user});
//     });
// });

app.post('/admin/login', (req, res) => {
    let pseudo = req.body.pseudo;
    let email = req.body.email;

    co.query('SELECT * FROM vue_admins WHERE pseudo = ? AND email = ?', [pseudo, email], (err, result) => {
        if (err) {
            res.send({message: 'error bdd', value: null});
            return;
        }
        if(result.length === 0) {
            res.send({message: 'not found', value: null});
            return;
        }
        if(result.length > 1) {
            res.send({message: 'too many', value: null});
            return;
        }
        if(result[0].admin === 0) {
            res.send({message: 'is not admin', value: null});
            return;
        }

        res.send({message: 'success', value: result[0]});
    });

});

app.post('/register', (req, res) => {
    let pseudo = req.body.pseudo;
    let email = req.body.email;

    console.log(pseudo, email);


    co.query('INSERT INTO users (pseudo, email) VALUES (?, ?)', [pseudo, email], (err, result) => {
        if (err) {
            res.send('error');
            return;
        }
        let id = result.insertId;
        co.query('INSERT INTO data (idU, credit, score) VALUES (?, ?, ?)', [id, 0, 0], (err, result) => {
            if (err) {
                res.send('error');
                return;
            }
        });
    });
    res.send('success');
});

app.post('/logout', (req, res) => {
    let id = req.body.id;
    let user = usersLoggued.find(u => u.id === id);

    co.query('UPDATE data SET credit = ?, score = ? WHERE idU = ?', [user.credit, user.score, user.id], (err, result) => {
        if (err) {
            res.send('error');
            return;
        }
    });

    usersLoggued.splice(usersLoggued.indexOf(user), 1);
    res.send('success');
});

app.post('/update', (req, res) => {
    let id = req.body.id;
    let credit = req.body.credit;
    let score = req.body.score;
    let user = usersLoggued.find(u => u.id === id);
    user.credit = credit;
    user.score = score;
    usersLoggued.splice(usersLoggued.indexOf(user), 1);
    usersLoggued.push(user);

    res.send('success');
});


app.post('/show', (req, res) => {

    res.send(usersLoggued);
});

app.post('/users', (req, res) => {
    co.query('SELECT * FROM vue_users', (err, result) => {
        if (err) {
            res.send('error');
            return;
        }
        res.send(result);
    });
});

app.post('/api/user/ban', (req, res) => {
    let userId = req.body.userId;
    let isBanned = req.body.isBanned;
    let user = usersLoggued.find(u => u.id === userId);
    console.log('ban', user);
    if(user != undefined) {
        console.log(user.toString());
        io.emit('ban', {userId, isBanned});
        usersLoggued.splice(usersLoggued.indexOf(usersLoggued.find(u => u.id === userId)), 1);
    }
    if (isBanned !== 0 && isBanned !== 1) {
        res.status(400).send('bad request');
        return;
    }
    if (isBanned === 1){
        isBanned = 0;
    }else{
        isBanned = 1;
        co.query('UPDATE data SET credit = ?, score = ? WHERE idU = ?', [user.credit, user.score, userId], (err, result) => {
            if (err) {
                res.status(500).send('data not found');
                return;
            }
        });
    }
    co.query('UPDATE users SET bannie = ? WHERE id = ?', [isBanned, userId], (err, result) => {
        if (err) {
            res.status(500).send('user not found');
            return;
        }
        res.send('success');
    });
});

app.post('/admin/user/del', (req, res) => {
    let userId = req.body.userId;
    console.log('delete', userId);
    if(usersLoggued.find(u => u.id === userId)) {
        res.status(403).send('is connected, ban first');
        return;
    }else{
        co.query('DELETE FROM data WHERE idU = ?', [userId], (err, result) => {
            if (err) {
                res.status(403).send('data not found');
                return;
            }
            co.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
                if (err) {
                    res.status(500).send('user not found');
                    return;
                }
                res.send('success');
            });
        });
    }
});