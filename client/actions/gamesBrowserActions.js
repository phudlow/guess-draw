import { NEW_GAMES_BROWSER_DATA } from './types';

export function newGamesBrowserData(gamesData) {
    return {
        type: NEW_GAMES_BROWSER_DATA,
        payload: gamesData
    };
};