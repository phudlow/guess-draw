import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameLobbyPlayerSlot from './GameLobbyPlayerSlot';
import socket from '../socket';
import { toggledSlotOpenClosed, switchedPlayerSlot, kickedFromGame, leftGame } from '../actions/gameActions';

class GameLobby extends Component {
    constructor(props) {
        super(props);

        this.isCreator = this.props.game.creator === this.props.nickName;

        this.onPlayerSlotClick  = this.onPlayerSlotClick.bind(this);
        this.onSlotTogglerClick = this.onSlotTogglerClick.bind(this);
        this.onLeaveClick       = this.onLeaveClick.bind(this);

        socket.on('toggledslotopenclosed', gameData => {
            console.log('toggledslotopenclosed', gameData);
            this.props.toggledSlotOpenClosed(gameData);
        });

        socket.on('switchedplayerslot', gameData => {
            this.props.switchedPlayerSlot(gameData);
        });

        socket.on('kickedfromgame', () => {
            this.props.kickedFromGame();
        });

        socket.on('leftgame', () => {
            console.log('leftgame');
            this.props.leftGame();
        });
    }
    onPlayerSlotClick(e) {
        const slotIdx = e.nativeEvent.target.parentNode.getAttribute('idx');
        if (this.props.game.players[slotIdx] === 'OPEN') {
            socket.emit('switchplayerslot', {
                gameId: this.props.game.id,
                slotIdx
            });
        }
    }
    onSlotTogglerClick(e) {

        if (!this.isCreator) {
            return;
        }

        let confirmed = true;
        let slotIdx = e.nativeEvent.target.parentNode.getAttribute('idx');
        const occupiedBy = this.props.game.players[slotIdx];

        if (!['OPEN', 'CLOSED'].includes(occupiedBy)) {
            confirmed = window.confirm(`This slot is occupied by ${occupiedBy}. Are you sure you want to close this slot and remove ${occupiedBy}?`);
        }

        if (confirmed) {
            socket.emit('toggleslotopenedclosed', {
                gameId: this.props.game.id,
                slotIdx: e.nativeEvent.target.parentNode.getAttribute('idx')
            });
        }
    }
    onLeaveClick() {
        socket.emit('leavegame', {
            gameId: this.props.game.id,
            slotIdx: this.props.game.players.indexOf(this.props.nickName)
        });
    }
    render() {
        const players = this.props.game.players;
        let onSlotTogglerClick = this.isCreator ? this.onSlotTogglerClick : null;

        const playersHtml = players.map((player, idx) => {
            const slotTogglerHandler = player === this.props.nickName ? null : onSlotTogglerClick;
            return <GameLobbyPlayerSlot
                key={idx}
                idx={idx}
                onSlotTogglerClick={slotTogglerHandler}
                onPlayerSlotClick={this.onPlayerSlotClick}
                player={player}
            />;
        });

        return (
            <div>
                <div className="players-container">
                    {playersHtml}
                </div>
                <button onClick={this.onLeaveClick}>Leave Game</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        game: state.game,
        nickName: state.nickName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggledSlotOpenClosed: data => dispatch(toggledSlotOpenClosed(data)),
        switchedPlayerSlot: data => dispatch(switchedPlayerSlot(data)),
        kickedFromGame: data => dispatch(kickedFromGame(data)),
        leftGame: data => dispatch(leftGame(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameLobby);
