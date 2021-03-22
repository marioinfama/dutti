import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string = null;
  private usuario: User;
  constructor(private http: HttpClient) { }

  registro( usuario: User ) {

    return new Promise( resolve => {

      this.http.post(`${ URL }/user/create`, usuario )
          .subscribe( async resp => {
            if ( resp['ok'] ) {
              await this.guardarToken( resp['token'] );
              resolve(true);
            } else {
              this.token = null;
              localStorage.clear();
              resolve(false);
            }

          });


    });


  }

  async guardarToken( token: string ) {

    this.token = token;
    await localStorage.setItem('token', token)

    await this.validaToken();


  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {
      return Promise.resolve(false);
    }


    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/user/`, { headers })
        .subscribe( resp => {

          if ( resp['ok'] ) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            resolve(false);
          }

        });


    });

  }

  async cargarToken() {

    this.token = await localStorage.getItem('token') || null;

  }

  login( username: string, password: string ) {

    const data = { username, password };

    return new Promise( resolve => {

      this.http.post(`${ URL }/user/login`, data )
        .subscribe( async resp => {

          if ( resp['ok'] ) {
            await this.guardarToken( resp['token'] );
            resolve(true);
          } else {
            this.token = null;
            localStorage.clear();
            resolve(false);
          }

        });

    });

  }

}
