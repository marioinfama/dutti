import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  url: string = 'https://swapi.dev/api/starships/'
  headerDict = {
    'Authorization': 'none',
    'Access-Control-Allow-Origin': '*'
  }
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };
  
  constructor( private http: HttpClient ) {}

  getShips(): Observable<any>{
    return this.http.get(this.url).pipe( 
      map( data => { return data })
      );
  }
  getShipsByPage(numPage: number):Observable<any> {
    var newUrl = this.url +'?page='+numPage;
    return this.http.get(newUrl).pipe( 
      map( data => { return data })
      );
  }
}
