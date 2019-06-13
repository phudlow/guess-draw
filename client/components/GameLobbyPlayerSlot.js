import React from 'react';

function GameLobbyPlayerSlot(props) {
    let toggler = null;
    let player  = props.player;

    // If toggle handler provided, show open (+) and close (-) toggler
    if (props.onSlotTogglerClick) {
        const symbol = player === 'CLOSED' ? '+' : '-';
        toggler = <span className="toggle-slot" onClick={props.onSlotTogglerClick} >{symbol}</span>;
    }

    return (
        <div className="player-slot" idx={props.idx}>
            <span onClick={props.onPlayerSlotClick}>{player}</span>
            {toggler}
        </div>
    );
}

export default GameLobbyPlayerSlot;