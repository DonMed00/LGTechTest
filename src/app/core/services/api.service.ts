import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharacterList, Result } from '../models/CharacterList';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl + "/character/?page=1";

  private characterList : CharacterList
  private characterList$ : Subject<CharacterList>;

  private favsList : Result[]
  private favsList$ : Subject<Result[]>;

  private currentCharacter : Result
  constructor(private httpClient : HttpClient, public toastController: ToastController) {
    this.characterList = {
      info: undefined,
      results: []
    }
    this.characterList$ = new Subject();
    this.favsList = [];
    this.favsList$ = new Subject();

   }


  async getCharacters(url : string){

    await this.httpClient.get<CharacterList>(url).subscribe(characters => {
      this.setCharacterList(characters);
    });
  }

  async filterCharacter(filter : string){
    await this.httpClient.get<CharacterList>(environment.apiUrl + "/character/?name=" + filter).subscribe(characters => {
      
    this.setCharacterList(characters);

    }, error => {
        this.setCharacterList({
        info: undefined,
        results: []
      });
    });
  }


  
  
  async addToFavsList(character : Result){
    this.favsList.push(character);
    this.favsList$.next(this.favsList);
    this.presentToast(character.name + " added to favs.")
  }
  removeFromFavsList(character : Result){
    this.favsList.splice(this.favsList.indexOf(character),1);
    this.favsList$.next(this.favsList);
    this.presentToast(character.name + " removed from favs.")

  }


  async presentToast(text : string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }


  //GETTERS - SETTERS
  

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


  getfavsList(){
    return this.favsList$.asObservable();
  }
  getfavsListInitial(){
    return this.favsList;
  }
  setFavsList(favsList : Result[]){
    this.favsList = favsList;
    this.favsList$.next(this.favsList);
  }
}
