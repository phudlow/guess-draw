const path   = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');
const app    = express();
const server = require('http').Server(app);
const io     = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });

// Log requests to console
app.use(morgan('tiny'));

// Use secure headers
app.use(helmet());

// Static files
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
    console.log('connected to express app');
});

const clients = [];
io.on('connection', socket => {
    console.log('socket connected');

    socket.on('nicknamesubmitted', nickname => {
        if (!clients.find(client => client.nickname === nickname)) {
            socket.nickname = nickname;
            socket.emit('nicknameconfirmed', nickname);
        }
        else {
            socket.emit('nicknamedenied', nickname);
        }
    });

    clients.push(socket);
});