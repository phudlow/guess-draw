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

const clients  = [];
const games    = {};
let currGameId = 0;
function getJoinableGames() {
    return Object.values(games).map(game => game.serialize());
}

io.on('connection', socket => {
    console.log('Socket connected.', 'Number of games:', Object.keys(games).length);

    // Nickname
    socket.on('nicknamesubmitted', nickName => {
        if (
            clients.find(client => client.nickName === nickName) ||
            nickName.toUpperCase() === 'OPEN' ||
            nickName.toUpperCase() === 'CLOSED'
        ) {
            socket.emit('nicknamedenied', nickName);
        } else {
            socket.nickName = nickName;
            socket.emit('nicknameconfirmed', nickName);
            socket.emit('joinablegamesdata', getJoinableGames());
            socket.join('gamesbrowser');
        }
    });

    // Create game
    socket.on('creategame', () => {
        const game = new Game(currGameId++, socket);
        games[game.id] = game;
        socket.join(game.id);
        socket.emit('createdgame', game.serialize());
        io.to('gamesbrowser').emit('joinablegamesdata', getJoinableGames());
    });

    // Join existing game
    socket.on('joingame', id => {
        const game = games[id];
        const players = game.players;
        const maxPlayers = game.options.maxPlayers;

        // Place player in first joinable spot
        for ( let i = 0, len = maxPlayers; i < len; i++ ) {
            if (players[i] === 'OPEN') {
                games[id].players[i] = socket;
                break;
            }
        }

        socket.leave('gamesbrowser');
        socket.join(id);
        io.to(id).emit('joinedgame', game.serialize())
        io.to('gamesbrowser').emit('joinablegamesdata', getJoinableGames());
    });

    // Player slots
    socket.on('switchplayerslot', data => {
        const game = games[data.gameId];
        const currIdx = game.players.findIndex(player => player.nickName === socket.nickName);
        game.players[currIdx] = 'OPEN';
        game.players[data.slotIdx] = socket;
        
        io.to(game.id).emit('switchedplayerslot', game.serialize())
    });
    socket.on('toggleslotopenedclosed', data => {
        const game = games[data.gameId];
        const occupiedBy = game.players[data.slotIdx];
        if (occupiedBy.nickName) {
            occupiedBy.emit('kickedfromgame');
            occupiedBy.leave(game.id);
            occupiedBy.join('gamesbrowser');
            game.players[data.slotIdx] = 'OPEN';
        }
        game.players[data.slotIdx] = game.players[data.slotIdx] === 'OPEN' ? 'CLOSED' : 'OPEN';

        console.log(game.players);
        
        io.to(game.id).emit('toggledslotopenclosed', game.serialize());
        io.to('gamesbrowser').emit('joinablegamesdata', getJoinableGames());
    });

    // Leave game
    socket.on('leavegame', data => {

        // HERE, handle creator leaving the game
        const game = games[data.gameId];
        game.players[data.slotIdx] = 'OPEN';
        socket.leave(game);
        socket.join('gamesbrowser');
        console.log('leavegame');
        socket.emit('leftgame');
        io.to(game.id).emit('leftgame', game.serialize());
        io.to('gamesbrowser').emit('joinablegamesdata', getJoinableGames());
    });

    clients.push(socket);
});

class Game {
    constructor(id, creator) {
        this.id = id;

        this.creator = creator;
        this.status = 'lobby';
        this.options = {
            maxPlayers: 5
        };
        this.players = [];

        let count = 0;
        while (count < this.options.maxPlayers) {
            this.players.push('OPEN');
            count++;
        }
        this.players[0] = creator;
    }
    serialize() {
        return {
            id:      this.id,
            creator: this.creator.nickName,
            status:  this.status,
            options: this.options,
            players: this.players.map(player => {
                return player && player.nickName ? player.nickName : player;
            })
        };
    }
}