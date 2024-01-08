import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface ParsingResult {
  seeds: number[];
  seedsPart2: SeedRange[];
  valuesMaps: ValuesMap[];
}

interface ValuesMap {
  sourceCategory: string;
  destinationCategory: string;
  rangeData: {
    sourceRangeStart: number;
    destinationRangeStart: number;
    length: number;
  }[];
}

// part 2
interface SeedRange {
  seedNum: number;
  length: number;
}

@Component({
  selector: 'app-p05',
  standalone: true,
  imports: [],
  templateUrl: './p05.component.html',
  styleUrl: './p05.component.css'
})
export class P05Component {

  seeds: number[] = [];
  valuesMap: ValuesMap[] = [];
  finalSeedsConversion: number[] = [];

  seedsPart2: SeedRange[] = []; // part 2
  lowestSeedPart2: number = Infinity;
  checkedSeeds = new Set<number>();

  constructor(private httpClient: HttpClient) {

    this.httpClient.get("assets/inputs/p05.txt", { responseType: 'text' }).subscribe(
      data => {
        const parseResult = this.parseInput(data);
        this.seeds = parseResult.seeds;
        this.valuesMap = parseResult.valuesMaps;
        this.seedsPart2 = parseResult.seedsPart2;

        this.finalSeedsConversion = this.findSeedConversionResults(this.seeds, this.valuesMap);

        // slow as heck lmao pls help
        for (let range of this.seedsPart2) {
          for (let i = range.seedNum; i <= (range.seedNum + range.length); i++ ) {
            if (this.checkedSeeds.has(i)) {
              continue;
            }
            this.checkedSeeds.add(i);

            const result = this.findSingleSeedSeedConversionResults(i, this.valuesMap);
            if (result < this.lowestSeedPart2) {
              this.lowestSeedPart2 = result;
            }
          }

        }

      }
    )
  }

  getLowestNum(array: number[]): number {
    return Math.min(...array);
  }

  parseInput(input: string): ParsingResult {

    const finalResult: ParsingResult = {
      seeds: [],
      seedsPart2: [],
      valuesMaps: [],
    }

    const inputLines = input.trim().split("\n");

    // assume it starts with seeds line
    const seeds = inputLines[0].split(" ");
    let seedDataType = false; // 0 -> number, 1 -> length
    let currentNumber = -1;
    let currentLength = -1
    for (let seed of seeds) {

      const seedNumber = Number(seed);
      if (!isNaN(seedNumber)) {

        finalResult.seeds.push(seedNumber);

        if (!seedDataType) {
          currentNumber = seedNumber;
        } else {
          currentLength = seedNumber;
          finalResult.seedsPart2.push({
            seedNum: currentNumber,
            length: currentLength,
          });
        }
        seedDataType = !seedDataType;
      }

    }

    let currentMap: ValuesMap = {
      sourceCategory: "",
      destinationCategory: "",
      rangeData: []
    };

    for (let line of inputLines.slice(2)) {

      // reset to new map when empty line shows up
      if (line === "") {
        finalResult.valuesMaps.push(currentMap);
        currentMap = {
          sourceCategory: "",
          destinationCategory: "",
          rangeData: []
        };
        continue;
      }

      // names line
      if (line.includes("map")) {
        const names = line.split(" ")[0].split("-");
        currentMap.sourceCategory = names[0];
        currentMap.destinationCategory = names[2];
        continue;
      }

      // line with data
      const numbers = line.split(" ").map( string => { return Number(string) }  );
      currentMap.rangeData.push({
        sourceRangeStart: numbers[1],
        destinationRangeStart: numbers[0],
        length: numbers[2],
      });
    }
    finalResult.valuesMaps.push(currentMap);
    console.log("Final parsing result is:\n", finalResult);

    return finalResult;
  }

  findSeedConversionResults(seeds: number[], valuesMap: ValuesMap[]): number[] {

    const seedConversionResults: number[] = [...seeds];

    for (let conversionMap of valuesMap) {

      console.log("Current Map:", conversionMap);

      for (let i = 0; i < seedConversionResults.length; i++) {
        const seed = seedConversionResults[i];
        const foundRange = conversionMap.rangeData.find( data => {
          /* if (data.sourceRangeStart <= seed && seed <= (data.sourceRangeStart + data.length)) {
            console.log(`Found rage for seed ${i}:`, data.sourceRangeStart, seed, data.sourceRangeStart + data.length);
          } */
          return (data.sourceRangeStart <= seed && seed <= (data.sourceRangeStart + data.length))  } );
        if (foundRange) {
          //console.log(`Applying to seed ${i}:`, foundRange.destinationRangeStart - foundRange.sourceRangeStart);
          seedConversionResults[i] = seedConversionResults[i] + foundRange.destinationRangeStart - foundRange.sourceRangeStart;
        }
      }
      //console.log("Seeds progess:", seedConversionResults);

    }

    return seedConversionResults;
  }

  findSingleSeedSeedConversionResults(seed: number, valuesMap: ValuesMap[]): number {

    let seedConversionResult = seed;

    for (let conversionMap of valuesMap) {

      //console.log(conversionMap);

      const foundRange = conversionMap.rangeData.find( data => {
        /* if (data.sourceRangeStart <= seedConversionResult && seedConversionResult <= (data.sourceRangeStart + data.length)) {
          console.log(`Found range for seed ${seed}:`, data.sourceRangeStart, seedConversionResult, data.sourceRangeStart + data.length);
        } */
        return (data.sourceRangeStart <= seedConversionResult && seedConversionResult <= (data.sourceRangeStart + data.length))  } );
      if (foundRange) {
        //console.log(`Applying to seed ${seed}:`, foundRange.destinationRangeStart - foundRange.sourceRangeStart);
        seedConversionResult = seedConversionResult + foundRange.destinationRangeStart - foundRange.sourceRangeStart;
      }
      //console.log("Seed progess:", seedConversionResult);

    }

    return seedConversionResult;
  }

}
