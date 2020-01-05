import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Track} from './model/track';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShuffleService {
  AUTH_TOKEN = localStorage.getItem('access_token');

  constructor(private httpClient: HttpClient) {
  }


  shuffle(playlistID: string, track: Track) {
    let baseUrl = environment.BACKEND_IP_BASE + '/shuffle';
    let body = {'access_token': this.AUTH_TOKEN, 'playlist': playlistID, 'track': track.spotifyId};
    return this.httpClient.post(baseUrl, body, {observe: 'response'});
  }
}
