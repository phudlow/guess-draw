import { RECIEVED_JOINABLE_GAMES_DATA } from './types';

export function recievedJoinableGamesData(gamesData) {
    return {
        type: RECIEVED_JOINABLE_GAMES_DATA,
        payload: gamesData
    };
};