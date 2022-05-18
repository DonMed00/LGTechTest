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
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: undefined,
    location: undefined,
    image: '',
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
    console.log(this.apiService.getCurrentCharacter());
  }

}
