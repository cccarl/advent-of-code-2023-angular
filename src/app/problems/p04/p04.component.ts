import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Card {
  id: number;
  winners: number[];
  received: number[];
  matchCount: number,
  scorePart1: number;
  amount: number; // part 2
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
  part2FinalSum = 0;

  constructor(private httpClient: HttpClient) {

    this.httpClient.get("assets/inputs/p04.txt", {responseType: 'text'}).subscribe(
      data => {
        this.input = data;
        this.cards = this.parseCards(this.input);
        this.part1FinalSum = this.finishgHIMMMimeanpart1(this.cards);
        this.executePart2idk(this.cards);
        this.part2FinalSum = this.finishgHIMMMimeanpart2(this.cards);
      }
    );
  }

  sortNumArray(array: number[]) {
    return array.sort((n1,n2) => n1 - n2);
  }

  parseCards(input: string): Card[] {
    const finalCards: Card[] = [];

    const startWinners = 10;
    const startPlayer = 42;

    const inputLines = input.trimEnd().split("\n");
    for (let line of inputLines) {
      const id = Number(line.substring(5, 8).replace(":", ""));
      const winnerNums = line
        .substring(startWinners, startPlayer - 3)
        .split(" ")
        .filter( item => {return item !== ""} )
        .map( item => {return Number(item)} );
      const playerNumbers = line
        .substring(startPlayer)
        .split(" ")
        .filter( item => {return item !== ""} )
        .map( item => {return Number(item)} );

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
        matchCount: matchCount,
        scorePart1: cardScore,
        amount: 1,
      });

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

  executePart2idk(cards: Card[]) {

    for (let card of cards) {
      for (let i = 1; i <= card.matchCount; i++) {
        const cardToUpdate = cards.find( cardInArray => { return cardInArray.id === card.id + i } );
        if (!cardToUpdate) {
          console.warn("Didn't find card to add amount with (calculated) ID:", card.id + i);
          continue;
        }

        cardToUpdate.amount += card.amount;
      }
    }
  }

  finishgHIMMMimeanpart2(cards: Card[]): number {

    let sum = 0;

    for (let card of cards) {
      sum += card.amount;
    }

    return sum;
  }

}
