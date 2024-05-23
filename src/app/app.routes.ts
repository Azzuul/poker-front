import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { TableWinnersComponent } from './components/table-winners/table-winners.component';

export const routes: Routes = [
    {path:'',redirectTo:'/game',pathMatch:'full'},
    { path: 'game', component: GameComponent },
    { path: 'winners', component: TableWinnersComponent }
  ];