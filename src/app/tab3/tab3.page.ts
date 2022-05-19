import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Router } from '@angular/router';
import { Result } from '../core/models/CharacterList';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  charactersFavs = [];

  constructor(private apiService : ApiService, private router: Router) { }

  ngOnInit(): void {
    this.charactersFavs = this.apiService.getfavsListInitial();
    this.apiService.getfavsList().subscribe(list => {
      this.charactersFavs = list;
    })
  }

  viewProfile(character : Result){
    this.apiService.setCurrentCharacter(character);
    this.router.navigate(['/profile']);
  }

  removeCharacter(character : any){
    this.apiService.removeFromFavsList(character);
  }


}
