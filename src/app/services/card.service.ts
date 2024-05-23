import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Card } from '../models/playerCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private url:string='http://card.localhost/v1/poker';


  constructor(private http:HttpClient) { }

  deal():Observable<string>{
    return this.http.get(this.url, { responseType: 'text' });
  }

  addPlayer(mazo: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.url}/${mazo}/player`).pipe(
      map(cards => cards.map(card => this.mapIncomingCard(card)))
    );
  }

  private mapIncomingCard(card: any): Card {
    return {
      ...card,
      cardType: card.charactercardTypeEnum,
      charactercardTypeEnum: undefined // Elimina la propiedad antigua
    };
  }

  addFlop(mazo:string):Observable<Card[]>{
    return this.http.get<Card[]>(`${this.url}/${mazo}/flop`);
  }

  addTurn(mazo:string):Observable<Card[]>{
    return this.http.get<Card[]>(`${this.url}/${mazo}/turn`);
  }

  addRiver(mazo:string):Observable<Card[]>{
    return this.http.get<Card[]>(`${this.url}/${mazo}/river`);
  }

}

