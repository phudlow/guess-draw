import {
    JOINED_GAME,
    CREATED_GAME,
    TOGGLED_SLOT_OPEN_CLOSED,
    SWITCHED_PLAYER_SLOT,
    KICKED_FROM_GAME,
    LEFT_GAME
} from '../actions/types';

const initialState = {
    game: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case JOINED_GAME:
        case CREATED_GAME:
        case TOGGLED_SLOT_OPEN_CLOSED:
        case SWITCHED_PLAYER_SLOT:
        case KICKED_FROM_GAME:
        case LEFT_GAME:
            return action.payload;
        default:
            return state;
    }
}