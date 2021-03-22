import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users/services/users.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor( private usersService: UsersService, private router: Router ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean  {

    return this.usersService.validaToken();
  }

}
