import { Component, OnInit, Input } from '@angular/core';
import { ShipsService } from '../../../services/ships.service';
declare var $: any;


@Component({
  selector: 'ships-details',
  templateUrl: './ships-details.component.html',
  styleUrls: ['./ships-details.component.scss']
})
export class ShipsDetailsComponent implements OnInit {

  @Input() dataList: any;
  config: any;
  shipId: string = '';
  url: string = '';
  // Modal
  titleDetails: string = '';
  modelDetails: string = '';
  starship_class: string = '';

  constructor(private shipsService:ShipsService) { 
  }
  
  ngOnInit(): void {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.dataList? this.dataList['count']:0
      };
  }

  getStarshipId(url): string {
    var shipId = url.split('/')[5];
    const urlImage = 'https://starwars-visualguide.com/assets/img/starships/'+shipId+'.jpg';
    return urlImage;
  }

  pageChanged(event){
    this.shipsService.getShipsByPage(event).subscribe((ships) =>{
      this.dataList = ships;
    });
    this.config.currentPage = event;
  }

  openDetails(details) {
    $("#exampleModal").modal('show');
    this.titleDetails = details.name;
    this.modelDetails = details.model;
    this.starship_class = details.starship_class
  }

}
