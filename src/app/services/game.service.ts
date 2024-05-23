import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { Observable, map } from 'rxjs';
import { Card } from '../models/playerCard';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url:string='http://localhost:8081/api/v1';
  
  constructor(private http: HttpClient) { }

  getWinners(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.url}/player/winners`).pipe(
      map(players => players.map(player => this.mapIncomingPlayer(player)))
    );
  }

  getWinner(players: Player[]): Observable<Player> {
    const outgoingPlayers = players.map(player => this.mapOutgoingPlayer(player));
    return this.http.post<Player>(`${this.url}/player/winner`, outgoingPlayers).pipe(
      map(responsePlayer => this.mapIncomingPlayer(responsePlayer))
    );
  }

  private mapIncomingPlayer(player: any): Player {
    return {
      ...player,
      cards: player.cards.map((card: any) => this.mapIncomingCard(card))
    };
  }

  private mapIncomingCard(card: any): Card {
    return {
      ...card,
      cardType: card.charactercardTypeEnum,
      charactercardTypeEnum: undefined // Opcional: eliminar la propiedad antigua
    };
  }

  private mapOutgoingPlayer(player: Player): any {
    return {
      ...player,
      cards: player.cards.map(card => this.mapOutgoingCard(card))
    };
  }

  private mapOutgoingCard(card: Card): any {
    return {
      ...card,
      cardType: card.characterCardTypeEnum, // Mapear al formato esperado por el servidor
      characterCardTypeEnum: undefined // Opcional: eliminar la propiedad antigua
    };
  }

}
