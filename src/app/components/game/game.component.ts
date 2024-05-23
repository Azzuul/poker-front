import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/player';
import { Router, RouterModule } from '@angular/router';
import { Card } from '../../models/playerCard';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './game.component.html',
  // styleUrl: './game.component.css'
})
export class GameComponent {
  isDisabled: boolean = false;
  mazo :string='';
  name1:string='';
  idWinner:number=0;
  mesaCards:Card[]=[];
  mesaTemporalCard:Card[]=[];
  winnerResult: Player = {playerName:'',mazo:'',cards:[],puntuacion:0};

  
  backupMesaCards: Card[] = [];
  players:Player[]=[]

  errorMessage: string | null = null;


  constructor(private service:CardService,private gameService: GameService,private router:Router){
  }
  
  nombreJugadorActual: string='';
  indiceJugadorActual:number=0;
  primeraVez:boolean=true; disableBoton:boolean=true; winnerExists:boolean=false;

  
  mostrarSiguienteJugador() {
    if(this.primeraVez){
      this.backupMesaCards = this.mesaCards.slice();
      this.primeraVez=false;
    }

    console.log(this.mesaCards);




    const jugadorActual = this.players[this.indiceJugadorActual];
    this.nombreJugadorActual =jugadorActual.playerName;
  
    // Verificar si el jugador actual tiene exactamente 5 cartas
    if (jugadorActual.cards.length === 5) {
      // Avanzar al siguiente jugador
      this.indiceJugadorActual++;
      this.mesaCards=this.backupMesaCards;
      if (this.indiceJugadorActual >= this.players.length) {
        this.indiceJugadorActual = 0;
        if(this.indiceJugadorActual == 0 && this.disableBoton){
          this.toggleButtonState();
          this.disableBoton=false;
        }
      }
    } else {
      console.log(`El jugador ${jugadorActual.playerName} no tiene exactamente 5 cartas.`);
    }
  }

  
  botarCardPlayer(card: Card, nombreJugadorActual: string): void {
    const jugadorActual = this.players.find(player => player.playerName === nombreJugadorActual);
    if (jugadorActual) {
      jugadorActual.cards = jugadorActual.cards.filter(c => c !== card);
      this.mesaCards.push(card);
    }
  }
  
  tomarCardPlayer(card: Card, nombreJugadorActual: string): void {
    const jugadorActual = this.players.find(player => player.playerName === nombreJugadorActual);
    if (jugadorActual && this.mesaCards.length > 0) {
      this.mesaCards = this.mesaCards.filter(c => c !== card);
      jugadorActual.cards.push(card);
    }
  }

  toggleButtonState() {
    this.isDisabled = !this.isDisabled;
  }

  winner(){
    this.gameService.getWinner(this.players).subscribe(
      (w:Player) => {
        if(w==null){
          this.winnerResult ==null;
        }else{
          this.winnerResult=w;
          this.winnerExists=true;
        }
    });
  }

reiniciarPartida(){
  this.toggleButtonState();
  this.resetCards();
}


  navigateToAnotherUrl() {
    this.router.navigate(['/user']);
  }


  deal(){
    this.service.deal().subscribe(m=>this.mazo=m);
    this.resetCards();
  }
  player(mazo:string,playerName:string){
    this.service.addPlayer(mazo).subscribe(c => this.players = [...this.players,{playerName:playerName,cards:c,mazo:this.mazo,puntuacion:0}]);
    this.name1='';
  }
  
  flop(mazo: string) {
    this.service.addFlop(mazo).subscribe(c => {
      this.mesaCards = [...this.mesaCards, ...c];
      });
  
  }

  turn(mazo:string){
    this.service.addTurn(mazo).subscribe(c=> this.mesaCards = [...this.mesaCards,...c]);

  }


  river(mazo:string){
    this.service.addRiver(mazo).subscribe(c=> this.mesaCards = [...this.mesaCards,...c]);
    this.toggleButtonState()
  }

  resetCards(){
    this.mesaCards=[];
    this.players=[];
    this.backupMesaCards=[];
    this.primeraVez=true , this.disableBoton=true,this.winnerExists=false;
    this.nombreJugadorActual=''
  }

}
