import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PlaylistoverviewComponent} from './playlistoverview/playlistoverview.component';
import {PlaylistComponent} from './playlist/playlist.component';


const routes: Routes = [
  {path: 'playlistoverview', component: PlaylistoverviewComponent},
  {path: 'playlist/:id', component: PlaylistComponent, data: { animation: 'playlist'}},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
