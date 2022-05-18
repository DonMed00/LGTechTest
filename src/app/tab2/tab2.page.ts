import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterList, Result } from '../core/models/CharacterList';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  characters : CharacterList = {
    info: undefined,
    results: []
  };

  searchQuery : string = "";
  constructor(private apiService : ApiService, private router: Router) {}


  ngOnInit(): void {
    this.apiService.getCharacterList().subscribe(list => {
      this.characters = list;
    })

    this.getCharacters(this.apiService.getApiUrl());
  }
  getCharacters(next : string) {
    this.apiService.getCharacters(next);
 
  }

  changeSearch(){
    console.log(this.searchQuery);
    this.apiService.filterCharacter(this.searchQuery);
  }


  viewProfile(character : Result){
    this.apiService.setCurrentCharacter(character);
    this.router.navigate(['/profile']);
  }

}
