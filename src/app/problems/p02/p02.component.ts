import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface GameResults {
  possible: boolean;
  power: number,
  gameId: number;
}

const limits = {
  red: 12,
  green: 13,
  blue: 14,
}

@Component({
  selector: 'app-p02',
  standalone: true,
  imports: [],
  templateUrl: './p02.component.html',
  styleUrl: './p02.component.css'
})
export class P02Component {

  input: string | undefined;
  gameResults: GameResults[] = []
  part1FinalSum = 0;
  part2FinalSum = 0;

  constructor(private httpClient: HttpClient) {

    this.httpClient.get("assets/inputs/p02.txt", {responseType: 'text'}).subscribe(
      data => {
        this.input = data;
        this.gameResults = this.determinePossibleGames(this.input);
        for (const result of this.gameResults) {
          if (result.possible) {
            this.part1FinalSum += result.gameId;
          }
          this.part2FinalSum += result.power;
        }
      }
    )

  }

  determinePossibleGames(input: string): GameResults[] {

    let finalResults: GameResults[] = [];

    for (const line of input.split("\n")) {
      if (line === "") continue;

      let possibleSet = true;

      const gameIdSetsSplit = line.split(": ");
      const gameId = Number(gameIdSetsSplit[0].substring(5));
      const gameSet = gameIdSetsSplit[1].split("; ");

      const powerElems: {
        red?: number,
        blue?: number,
        green?: number,
      } = {}

      for (const game of gameSet) {
        const gameMoves = game.split(", ");
        for (const move of gameMoves) {
          const splitQuantColor = move.split(" ");
          const quant = Number(splitQuantColor[0]);
          const colorKey = splitQuantColor[1] as keyof typeof limits;
          if ( limits[colorKey] < quant ) {
            possibleSet = false;
          }

          if (powerElems[colorKey] === undefined) {
            powerElems[colorKey] = quant;
          }
          else if (powerElems[colorKey]! < quant) {
            powerElems[colorKey] = quant;
          }

        }

      }

      finalResults.push({
        possible: possibleSet,
        gameId: gameId,
        power: (powerElems.blue ?? 0) * (powerElems.green ?? 0) * (powerElems.red ?? 0),
      })

    }

    return finalResults;
  }

}
