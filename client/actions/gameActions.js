import {
    JOINED_GAME,
    CREATED_GAME,
    TOGGLED_SLOT_OPEN_CLOSED,
    SWITCHED_PLAYER_SLOT,
    KICKED_FROM_GAME,
    LEFT_GAME
} from './types';

export function joinedGame(gameData) {
    return {
        type: JOINED_GAME,
        payload: gameData
    };
}

export function createdGame(gameData) {
    return {
        type: CREATED_GAME,
        payload: gameData
    };
}

export function toggledSlotOpenClosed(gameData) {
    return {
        type: TOGGLED_SLOT_OPEN_CLOSED,
        payload: gameData
    };
}

export function switchedPlayerSlot(gameData) {
    return {
        type: SWITCHED_PLAYER_SLOT,
        payload: gameData
    };
}

export function kickedFromGame() {
    setTimeout(() => {
        alert('The slot you occupied in the previous game was closed.');
    }, 0);
    return {
        type: KICKED_FROM_GAME,
        payload: null
    }
}

export function leftGame() {
    return {
        type: LEFT_GAME,
        payload: null
    }
}