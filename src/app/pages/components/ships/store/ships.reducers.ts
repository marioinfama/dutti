import { ShipsActions, ShipsActionType } from './ships.actions';

export const initialState = {};

export function shipsReducer(state = initialState, action: ShipsActions) {

  switch (action.type) {

    case ShipsActionType.GET_SHIPS_LIST: {
      return { ...state };
    }

    case ShipsActionType.GET_SHIPS_LIST_SUCCESS: {

      return {
        ...state,
        shipsList: action.payload,
      };
    }

    case ShipsActionType.GET_SHIPS_LIST_FAILED: {
      return { ...state };
    }

  }

}
