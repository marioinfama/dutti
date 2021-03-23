import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Ships from './store/ships.actions';
import { ShipsService } from 'src/app/pages/services/ships.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  public dataList: any = [];

  constructor( private store: Store<any>, private shipsService: ShipsService) {}

  ngOnInit(): void {
   /* this.shipsService.getShips().subscribe((ships) => {
      this.dataList = ships;
      console.log('SHIPS -->', this.dataList.results)
    })*/
    this.store.dispatch(new Ships.GetShipsList());
    this.store.select('ships').subscribe(response => {
      this.dataList = response.shipsList;

    }, error => {
      console.log(error);
    });

  }
}
