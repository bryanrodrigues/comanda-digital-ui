
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oaouthTokenUrl: string; // = "http://localhost:8080/oauth/token";

  tokensRevokeUrl: string; // ="http://localhost:8080/v1/tokens/revoke";


  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {
      this.loadToken();

      this.oaouthTokenUrl = `${environment.apiUrl}/oauth/token`;

      this.tokensRevokeUrl = `${environment.apiUrl}/v1/tokens/revoke`;

    }



  login(user: string, password: string): Promise<void>{

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');


    const body = `username=${user}&password=${password}&grant_type=password`;

    return this.http.post(this.oaouthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.stockToken(response['access_token']);
      })
      .catch(response => {
        console.log('Error: '  + JSON.stringify(response['error'].error));

        if(response['error'].error === 'invalid_grant'){
          return Promise.reject('Usuário ou senha inválida!');
        }

        return Promise.reject(response);
      });
  }

  private stockToken(token: string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.stockToken(token);
    }

  }

  hasPermission(permission: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  getNewAccessToken(): Promise<void>{
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oaouthTokenUrl, body,
      { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.stockToken(response['access_token']);
      console.log('Novo access token criado!');
      return Promise.resolve(null);
    })
    .catch(response => {
      console.error('Erro ao renovar token.', response);
      return Promise.resolve(null);
    })
  }

  isInvalidAccessToken(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  hasAnyPermission(roles){
    for(const role of roles){
      if(this.hasPermission(role)){
        return true;
      }
    }
    return false;
  }

  cleanAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  loggout(){
    return this.http.delete(this.tokensRevokeUrl, {withCredentials: true})
      .toPromise()
      .then(() => {
        this.cleanAccessToken();
      })
  }

}
