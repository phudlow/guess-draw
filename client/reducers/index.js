import { combineReducers } from 'redux';
import joinableGamesReducer from './joinableGamesReducer';
import nickNameReducer from './nickNameReducer';
import gameReducer from './gameReducer';

export default combineReducers({
    game: gameReducer,
    joinableGames: joinableGamesReducer,
    nickName: nickNameReducer
});