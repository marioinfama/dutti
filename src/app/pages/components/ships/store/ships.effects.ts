import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';


import {
  ShipsActionType,
  GetShipsListSuccess, GetShipsListFailed
} from './ships.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShipsService } from 'src/app/pages/services/ships.service';


@Injectable()
export class ShipsEffects {

  constructor(
    private actions$: Actions,
    private shipsService: ShipsService
  ) { }

  @Effect()
  getShipsList$ = this.actions$.pipe(
    ofType(ShipsActionType.GET_SHIPS_LIST),
    switchMap(() =>
      this.shipsService.getShips().pipe(
        map((list: Array<any>) => new GetShipsListSuccess(list)),
        catchError(error => of(new GetShipsListFailed(error)))
      )
    )
  );

}
