import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Player } from '../../models/player';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-table-winners',
  standalone: true,
  imports: [],
  templateUrl: './table-winners.component.html',
})
export class TableWinnersComponent implements OnInit {

  winners:Player[]=[];

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.allWinners();
  }

  
  allWinners(): void {
    this.gameService.getWinners().subscribe(w => {
      this.winners = w;
    });
  }
}