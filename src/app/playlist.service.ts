import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Playlist} from './model/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  AUTH_TOKEN = localStorage.getItem('access_token');
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.AUTH_TOKEN,
    })
  };

  constructor(private httpClient: HttpClient) {
  }


  getPlaylists() {
    const baseUrl = 'https://api.spotify.com/v1/me/playlists?limit=50';
    return this.httpClient.get(baseUrl, this.httpOptions);
  }


  getPlaylistTracksForId(spotifyId: string) {
    const baseUrl = 'https://api.spotify.com/v1/playlists/' + spotifyId + '/tracks';
    return this.httpClient.get(baseUrl, this.httpOptions);
  }

  getPlaylistForId(id: string) {
    const baseUrl = 'https://api.spotify.com/v1/playlists/' + id;
    return this.httpClient.get<Playlist>(baseUrl, this.httpOptions);
  }


}
