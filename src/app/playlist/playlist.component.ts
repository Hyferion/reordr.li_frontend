import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../playlist.service';
import {Track} from '../model/track';
import {selectValueAccessor} from '@angular/forms/src/directives/shared';
import {ShuffleService} from '../shuffle.service';
import {Playlist} from '../model/playlist';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistId: string;
  playlistTracks: Track[] = [];
  selectedTrack: Track;
  shuffling: boolean;
  playlist: Playlist;

  constructor(private route: ActivatedRoute, private playlistService: PlaylistService, private shuffleService: ShuffleService, private router: Router) {
  }

  ngOnInit() {
    this.playlistId = this.route.snapshot.paramMap.get('id');
    this.getPlaylistinfo();
    this.getTracksForPlaylistId();
  }


  getTracksForPlaylistId() {
    this.playlistService.getPlaylistTracksForId(this.playlistId).subscribe((data: JSON) => {
      let items = data['items'];
      console.log(items);
      for (let item of items) {
        let track = new Track();
        track.title = item['track']['name'];
        track.spotifyId = item['track']['id'];
        track.added_at = item['added_at'];
        track.added_by = item['added_by']['id'];
        track.artist = item['track']['artists'][0]['name'];
        track.img = item['track']['album']['images'][0]['url'];
        this.playlistTracks.push(track);
      }
      console.log(this.playlistTracks);
      this.selectedTrack = this.playlistTracks[0];
    });
  }

  goToPlaylistOverview() {
    this.router.navigate(['/playlistoverview']);
  }

  shuffle() {
    this.shuffling = true;
    this.playlistTracks = [];
    this.shuffleService.shuffle(this.playlistId, this.selectedTrack).subscribe(response => {
      if (response['status'] === 200) {
        this.getTracksForPlaylistId();
        this.shuffling = false;
      }
    });
  }

  getPlaylistinfo() {
    this.playlistService.getPlaylistForId(this.playlistId).subscribe((data: Playlist) => {
      this.playlist = data;
    });
  }

}
