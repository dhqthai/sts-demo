import produce from 'immer';
import * as types from './types';

const initialState = {
  loading: false,
  user: { id: '', name: '', role: '' },
  token: '',
  isLoggedIn: false,
  expiresIn: null,
};

export const AuthReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOGIN_REQUESTED:
        draft.loading = true;
        break;
      case types.LOGIN_SUCCESS:
        const { token, expiresIn, role } = action.payload;
        draft.loading = false;
        draft.token = token;
        draft.user = {
          // TODO: remove later after API is updated
          id: '1',
          name: '',
          role,
        };
        draft.isLoggedIn = true;
        draft.expiresIn = expiresIn;
        break;
      case types.LOGIN_FAILED:
        draft.loading = false;
        break;
      case types.LOGOUT_REQUESTED:
        draft.loading = true;
        break;
      case types.LOGOUT_SUCCESS:
        return { ...initialState };
      default:
        return state;
    }
  });
