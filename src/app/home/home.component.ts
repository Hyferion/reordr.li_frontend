import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.readHash();
    this.checkAccess();
  }

  readHash() {
    this.route.fragment.subscribe((fragment: string) => {
      let array = fragment.split('&');
      let token = array[0];
      let tokens = token.split('=');
      token = tokens[1];
      localStorage.setItem('access_token', token);
    });
  }

  checkAccess() {
    if (this.isAccessTokenpresent() && this.isAccessTokenValid()) {
      this.router.navigateByUrl('playlistoverview');
    }
  }


  redirectToAuthtenticate() {
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=ff06925dac9d4211b1aaa607e593ec91&redirect_uri=http://127.0.0.1:4200&response_type=token&scope=playlist-modify-public%20playlist-modify-private';
  }

  isAccessTokenpresent() {
    return localStorage.getItem('access_token') !== null;
  }

  isAccessTokenValid() {
    return this.userService.getUserID(localStorage.getItem('access_token')).subscribe((data: User) => {
      localStorage.setItem('userid', data.id);
      return true;
    }, error1 => {
      return false;
    });
  }

}
