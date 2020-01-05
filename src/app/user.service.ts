import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  getUserID(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
      })
    };
    return this.httpClient.get<User>(environment.SPOTIFY_API_BASE + '/me', httpOptions);
  }
}
