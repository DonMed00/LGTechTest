import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Result } from '../core/models/CharacterList';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, ViewWillEnter {

  character : Result = {
    id: 0,
    name: 'Rick',
    status: 'Dead',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: undefined,
    location: undefined,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [],
    url: '',
    created: undefined
  };
  constructor(private apiService : ApiService) {
    
  }
  ionViewWillEnter(): void {
   
  }

  ngOnInit() {
    this.character = this.apiService.getCurrentCharacter();
  }

}
