import { combineReducers } from 'redux';
import joinableGamesReducer from './joinableGamesReducer';
import nickNameReducer from './nickNameReducer';

export default combineReducers({
    joinableGames: joinableGamesReducer,
    nickName: nickNameReducer
});