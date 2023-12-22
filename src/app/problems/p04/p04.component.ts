import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Card {
  id: number;
  winners: number[];
  received: number[];
  scorePart1: number;
}

@Component({
  selector: 'app-p04',
  standalone: true,
  imports: [],
  templateUrl: './p04.component.html',
  styleUrl: './p04.component.css'
})
export class P04Component {

  input = "";
  cards: Card[] = [];
  part1FinalSum = 0;

  constructor(private httpClient: HttpClient) {

    this.httpClient.get("assets/inputs/p04.txt", {responseType: 'text'}).subscribe(
      data => {
        this.input = data;
        this.cards = this.parseCards(this.input);
        this.part1FinalSum = this.finishgHIMMMimeanpart1(this.cards);
      }
    );
  }

  parseCards(input: string): Card[] {
    const finalCards: Card[] = [];

    const inputLines = input.trimEnd().split("\n");
    for (let line of inputLines) {
      const id = Number(line.substring(5, 8));
      const winnerNums = line.substring(10, 39).split(" ").filter( item => {return item !== ""}).map( item => {return Number(item)} );
      const playerNumbers = line.substring(42).split(" ").filter( item => {return item !== ""}).map( item => {return Number(item)} );

      let cardScore = 0;
      let matchCount = 0;
      for (let pn of playerNumbers) {
        if (winnerNums.includes(pn)) {
          matchCount += 1;
        }
      }

      if (matchCount > 0) {
        cardScore = Math.pow(2, matchCount-1);
      }

      finalCards.push({
        id: id,
        winners: winnerNums,
        received: playerNumbers,
        scorePart1: cardScore,
      })

    }

    return finalCards;
  }

  finishgHIMMMimeanpart1(cards: Card[]): number {

    let sum = 0;

    for (let card of cards) {
      sum += card.scorePart1;
    }

    return sum;
  }

}
