import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { recievedJoinableGamesData } from '../actions/joinableGamesActions';
import { createdGame, joinedGame } from '../actions/gameActions';


class GamesBrowser extends Component {
    constructor(props) {
        super(props);

        this.onCreateGameClick = this.onCreateGameClick.bind(this);
        this.onJoinGameClick   = this.onJoinGameClick.bind(this);

        socket.on('joinablegamesdata', games => {
            this.props.recievedJoinableGamesData(games);
        });

        socket.on('createdgame', data => {
            this.props.createdGame(data);
        });

        socket.on('joinedgame', data => {
            this.props.joinedGame(data);
        });
    }
    onCreateGameClick() {
        socket.emit('creategame');
    }
    onJoinGameClick(e) {
        socket.emit('joingame', e.target.getAttribute('gameid'));
    }
    render() {
        const gamesList = this.props.joinableGames.map(game => {
            const maxPlayers = game.options.maxPlayers || 5;
            const numberJoined  = game.players.filter(item => !['OPEN', 'CLOSED'].includes(item)).length;
            const numberAllowed = maxPlayers - game.players.filter(item => item === 'CLOSED').length;
            return (
                <tr key={game.id}>
                    <td>{game.creator}</td>
                    <td>{`${numberJoined} / ${numberAllowed}`}</td>
                    <td>
                        <button gameid={game.id} onClick={this.onJoinGameClick}>Join</button>
                    </td>
                </tr>
            );
        });
        return (
            <div id="games-browser">
                <span>
                    <h4>Games Browser</h4>
                    <button onClick={this.onCreateGameClick}>Create</button>
                </span>
                <table id="games-list">
                    <thead>
                        <tr>
                            <th>Creator</th>
                            <th>Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gamesList}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        joinableGames: state.joinableGames,
        nickName: state.nickName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        recievedJoinableGamesData: data => dispatch(recievedJoinableGamesData(data)),
        joinedGame: data => dispatch(joinedGame(data)),
        createdGame: data => dispatch(createdGame(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesBrowser);
