import { NICKNAME_CONFIRMED } from '../actions/types';

export function nickNameConfirmed(name) {
    return {
        type: NICKNAME_CONFIRMED,
        payload: name
    };
}