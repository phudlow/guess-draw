import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { newGamesBrowserData } from '../actions/gamesBrowserActions';
import { createdGame, joinedGame } from '../actions/gameActions';


class GamesBrowser extends Component {
    constructor(props) {
        super(props);

        this.onCreateGameClick = this.onCreateGameClick.bind(this);
        this.onJoinGameClick   = this.onJoinGameClick.bind(this);

        this.turnSocketListeners('on');
    }
    componentWillUnmount() {
        this.turnSocketListeners('off');
    }
    turnSocketListeners(which) {
        socket[which]('newgamesbrowserdata', this.props.newGamesBrowserData);
        socket[which]('createdgame', this.props.createdGame);
        socket[which]('joinedgame', this.props.joinedGame);
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
        newGamesBrowserData: data => dispatch(newGamesBrowserData(data)),
        joinedGame: data => dispatch(joinedGame(data)),
        createdGame: data => dispatch(createdGame(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesBrowser);
