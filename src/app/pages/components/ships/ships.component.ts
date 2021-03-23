import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Ships from './store/ships.actions';
import { ShipsService } from 'src/app/pages/services/ships.service';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  listLoader: Promise<boolean>;

  public dataList: any = [];

  constructor( private store: Store<any>, private shipsService: ShipsService) {}

  ngOnInit(): void {
    this.store.dispatch(new Ships.GetShipsList());
    this.store.select('ships').subscribe(response => {
      this.dataList = response.shipsList;
      this.listLoader = Promise.resolve(true);
    }, error => {
      console.log(error);
    });

  }
}
