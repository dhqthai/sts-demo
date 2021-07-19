import { AppReducer } from 'App/reducer';
import { AuthReducer } from 'containers/Auth/duck/reducer';
import { UserReducer } from 'containers/Users/duck/reducers';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  user: UserReducer,
});

export default rootReducer;
