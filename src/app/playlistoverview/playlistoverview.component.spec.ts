import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistoverviewComponent } from './playlistoverview.component';

describe('PlaylistoverviewComponent', () => {
  let component: PlaylistoverviewComponent;
  let fixture: ComponentFixture<PlaylistoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
