import {Component, OnInit} from '@angular/core';
import {PlaylistService} from '../playlist.service';
import {Playlist} from '../model/playlist';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlistoverview',
  templateUrl: './playlistoverview.component.html',
  styleUrls: ['./playlistoverview.component.css']
})
export class PlaylistoverviewComponent implements OnInit {
  private playlists;

  constructor(private playlistService: PlaylistService, private router: Router) {
  }

  ngOnInit() {
    this.getPlaylists();
  }


  getPlaylists() {
    this.playlists = [];
    this.playlistService.getPlaylists().subscribe((data: JSON) => {
      let playlists = data['items'];
      for (let p of playlists) {
        let playlist = new Playlist();
        playlist.id = p['id'];
        playlist.name = p['name'];
        let images = p['images'];
        if (images.length !== 0) {
          playlist.img = p['images'][0]['url'];
        }
        let owner = p['owner']['id'];
        if (owner === localStorage.getItem('userid')) {
          this.playlists.push(playlist);
          playlist.owner = true;
        }
      }
      console.log(this.playlists);
    }, error => {
      this.router.navigate(['/home']);
    });
  }
}
