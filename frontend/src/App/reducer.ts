import * as types from 'App/type';
import produce from 'immer';

const initialState: AppStore = {
  loading: false,
  openMenu: false,
};

export const AppReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.TOGGLE_MENU:
        draft.openMenu = !draft.openMenu;
        break;
      default:
        return state;
    }
  });
