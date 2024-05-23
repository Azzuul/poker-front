import { Card } from "./playerCard";

export interface Player {
    playerName:string;
    mazo:string;
    cards:Card[];    
    puntuacion:number;
}