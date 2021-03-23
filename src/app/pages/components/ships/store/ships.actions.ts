import { Action } from '@ngrx/store';


export enum ShipsActionType {
  GET_SHIPS_LIST = 'GET_SHIPS_LIST',
  GET_SHIPS_LIST_SUCCESS = 'GET_SHIPS_LIST_SUCCESS',
  GET_SHIPS_LIST_FAILED = 'GET_SHIPS_LIST_FAILED',
}

export class GetShipsList implements Action {
  readonly type = ShipsActionType.GET_SHIPS_LIST;
}

export class GetShipsListSuccess implements Action {
  readonly type = ShipsActionType.GET_SHIPS_LIST_SUCCESS;
  constructor(public payload: Array<any>) { }
}

export class GetShipsListFailed implements Action {
  readonly type = ShipsActionType.GET_SHIPS_LIST_FAILED;
  constructor(public payload: string) { }
}

export type ShipsActions = GetShipsList |
  GetShipsListSuccess |
  GetShipsListFailed;
