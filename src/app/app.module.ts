import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

// Components
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/components/principal/principal.component';
import { UsersModule } from './users/users.module';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { shipsReducer } from './pages/components/ships/store/ships.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ShipsEffects } from './pages/components/ships/store/ships.effects';
import { storeLogger } from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = [logger];

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    UsersModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('ships', shipsReducer, { metaReducers }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ShipsEffects])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
