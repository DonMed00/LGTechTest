import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ViewWillEnter } from '@ionic/angular';
import { fromEvent } from 'rxjs';
import { CharacterList, Result } from '../core/models/CharacterList';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  characters : CharacterList = {
    info: undefined,
    results: []
  };


  constructor(private apiService : ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getCharacterList().subscribe(list => {
      this.characters.info = list.info;
      this.characters.results = this.characters.results.concat(list.results);
    })

    this.getCharacters(this.apiService.getApiUrl());
  }
  getCharacters(next : string) {
    this.apiService.getCharacters(next);
 

  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      if (this.characters.results.length === 826) {
        event.target.disabled = true;
        
      }
      if(this.characters.info.next != null){
        this.getCharacters(this.characters.info.next);

      }
    }, 500);
  }

  viewProfile(character : Result){
    this.apiService.setCurrentCharacter(character);
    this.router.navigate(['/profile']);
  }

  addToFav(character : any){
    console.log(character)
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
