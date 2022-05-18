import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharacterList, Result } from '../models/CharacterList';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl + "/character/?page=1";

  private characterList : CharacterList
  private characterList$ : Subject<CharacterList>;

  private currentCharacter : Result
  constructor(private httpClient : HttpClient) {
    this.characterList = {
      info: undefined,
      results: []
    }
    this.characterList$ = new Subject();
   }


  async getCharacters(url : string){

    await this.httpClient.get<CharacterList>(url).subscribe(characters => {
      this.setCharacterList(characters);
    });
  }

  async filterCharacter(filter : string){
    await this.httpClient.get<CharacterList>(environment.apiUrl + "/character/?name=" + filter).subscribe(characters => {
      this.setCharacterList(characters);
    });
  }


  setCharacterList(newCharacterList : CharacterList){
    this.characterList = newCharacterList;
    this.characterList$.next(this.characterList);
  }

  getCharacterList(){
    return this.characterList$.asObservable();
  }

  setCurrentCharacter(character : Result){
    this.currentCharacter = character;
  }

  getCurrentCharacter(){
    return this.currentCharacter;
  }

  getApiUrl(){
    return this.apiUrl;
  }

}
