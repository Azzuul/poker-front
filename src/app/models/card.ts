import { CardType } from "./cardType";

export interface Card {
    characterCardTypeEnum: CardType;
    number: number;
    symbol: string;
    use: boolean;
  }