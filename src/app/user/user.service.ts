import { User, UserChangePassword } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient,   HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string; // = "http://localhost:8080/v1/user";

  roleUrl: string; // = "http://localhost:8080/v1/permission";


  constructor(private http: HttpClient) {

    this.userUrl = `${environment.apiUrl}/v1/user`;

    this.roleUrl = `${environment.apiUrl}/v1/permission`;
   }

  save(user: User): Promise<User>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.userUrl}/save`, user, {headers})
      .toPromise()
      .then(response => response['content']);
  }

  listAll(): Promise<any>{

    return this.http.get(`${this.userUrl}/listAllUsersWithoutStoreAndPermissionUserStore`)
      .toPromise()
      .then(response => response);
  }

  findByCpf(cpf: string): Promise<User>{
    return this.http.get(`${this.userUrl}/find/cpf/${cpf}`)
      .toPromise()
      .then(response => {
        const user = response as User;
        return user;
      });
  }

  findById(idUser: string): Promise<User>{
    return this.http.get(`${this.userUrl}/find/id/${idUser}`)
      .toPromise()
      .then(response => {
        const user = response as User;
        return user;
      });
  }

  listAllRoles(): Promise<any>{
    return this.http.get(`${this.roleUrl}/listAll`)
      .toPromise()
      .then(response => response);
  }

  update(user: User){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.userUrl}/update`, user, {headers})
      .toPromise()
      .then(response => response['content']);
  }

  updateByAdmin(user: User){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.userUrl}/updateByAdmin`, user, {headers})
      .toPromise()
      .then(response => response['content']);
  }

  updatePassword(user: UserChangePassword){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.userUrl}/changePassword`, user, {headers})
      .toPromise()
      .then(response => response['content']);
  }

  listAllStoreUsers(): Promise<any>{
    return this.http.get(`${this.userUrl}/listAllUsersWithPermissionUserStore`)
      .toPromise()
      .then(response => response);
  }

  findStoreUsers(name: string): Promise<any>{
    return this.http.get(`${this.userUrl}/find/name/${name}/hasPermissionUserStore`)
      .toPromise()
      .then(response => response);
  }

}
