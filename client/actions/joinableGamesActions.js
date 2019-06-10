import { RECIEVED_JOINABLE_GAMES_DATA, JOINED_GAME } from './types';

export function recievedJoinableGamesData(gamesData) {
    return {
        type: RECIEVED_JOINABLE_GAMES_DATAs,
        payload: gamesData
    };
};

export function joinedGame(gameData) {
    return {
        type: JOINED_GAME,
        payload: gameData
    };
}