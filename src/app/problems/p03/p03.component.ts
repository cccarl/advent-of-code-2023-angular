import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Coordinate {
  x: number;
  y: number;
}

interface MapNumberData {
  number: number;
  xRange: number[];
  y: number;
}

@Component({
  selector: 'app-p03',
  standalone: true,
  imports: [],
  templateUrl: './p03.component.html',
  styleUrl: './p03.component.css'
})
export class P03Component {

  input: string = "";
  currentPartView = 2;

  // part 1
  validPoints: Coordinate[] = [];
  finalpart1Sum: number = 0;

  // part 2
  allNumberData: MapNumberData[] = [];
  part2Map: string[] = [];
  finalpart2Sum: number = 0;

  constructor(private httpClient: HttpClient) {

    this.httpClient.get("assets/inputs/p03.txt", {responseType: 'text'}).subscribe(
      data => {
        this.input = data;
        this.validPoints = this.findAllValidPoints(this.input);
        this.finalpart1Sum = this.calculatePartsSum(this.input);
        this.allNumberData = this.getAllNumberDataFromMap(this.input);
        console.log("All number data:", this.allNumberData);
        for (let y of this.createArrayRange(this.input.trimEnd().split("\n").length)) {
          let currentLine = ""
          for (let x of this.createArrayRange(this.input.trimEnd().split("\n")[y].length)) {
            currentLine = currentLine + this.getCurrentPrintPart2({x: x, y:y});
          }
          this.part2Map.push(currentLine);
        }
        this.finalpart2Sum = this.calcFinalPart2Sum(this.input, this.allNumberData);
      }
    );

  }

  createArrayRange(length: number) {
    return Array.from({length: length}, (value, key) => key);
  }

  validatePoint(inputC: Coordinate): boolean {
    const result = this.validPoints.find( validC => {
      return validC.x === inputC.x && validC.y === inputC.y;
    } ) !== undefined;
    return result;
  }

  getCurrentPrintPart2(coord: Coordinate): string {
    const result = this.allNumberData.find( number => {
      return number.xRange[0] <= coord.x && number.xRange[1] >= coord.x && number.y === coord.y;
    } );

    if (!result) {
      const asteriskSearch = this.input.trimEnd().split("\n");
      if (asteriskSearch[coord.y][coord.x] === "*") {
        return "*"
      }
      return ".";
    } else if (result.xRange[0] === coord.x) {
      return String(result.number);
    } else {
      return "";
    }
  }

  findAllValidPoints(input: string): Coordinate[] {

    const finalValidPoints:Coordinate[] = [];

    input = input.trimEnd();
    const inputLines = input.split("\n");
    for(let y = 0; y < inputLines.length; y++){

      for (let x = 0; x < inputLines[y].length; x++) {

        const currentChar = inputLines[y][x];
        const possibleNumber = Number(currentChar);

        if (isNaN(possibleNumber) && currentChar !== ".") {
          for (let offsetX of [-1, 0, 1]) {
            for (let offsetY of [-1, 0, 1]) {
              // ignore case of icon position
              if (offsetX === 0 && offsetY === 0) {
                continue;
              }

              const xPosToCheck = x-offsetX;
              const yPosToCheck = y-offsetY

              if (finalValidPoints.findIndex( coord => {return coord.x === xPosToCheck && coord.y === yPosToCheck} ) === -1) {
                finalValidPoints.push({x: xPosToCheck, y: yPosToCheck });
              }

            }
          }
        }
      }
    }

    return finalValidPoints;
  }

  calculatePartsSum(input: string): number {

    let finalSum = 0;

    input = input.trimEnd();
    const inputLines = input.split("\n");
    for(let y = 0; y < inputLines.length; y++){

      let currentNumber: string = "";
      let startPos: Coordinate = {x: 0, y: 0};
      let validNumber = false;
      for (let x = 0; x <= inputLines[y].length; x++) {

        const currentChar = inputLines[y][x];
        const possibleNumber = Number(currentChar);
        if (!isNaN(possibleNumber) && x !== inputLines[y].length-1) {
          if (currentNumber === "") {
            startPos = {x: x, y: y};
          }
          currentNumber = currentNumber + currentChar;
        }
        else if (currentNumber !== "" || x === inputLines[y].length-1)  {

          // last min patch to fix edge case when the line reaches the end, im so tired why do i do this
          // oh hey that was it, now the full thing is right
          if (x === inputLines[y].length-1) {
            if (isNaN(possibleNumber)) {continue}
            currentNumber = currentNumber + currentChar;
          }

          for (let checkingX = startPos.x; checkingX < x && !validNumber; checkingX++) {

            if (this.validatePoint( {x: checkingX, y: startPos.y} )) {
              validNumber = true;
            }
          }

          if (validNumber) {
            //console.log("char:", currentNumber, "number:", Number(currentNumber), "x", x, "y", y);
            finalSum += Number(currentNumber);
            //console.log(finalSum);
          }

          currentNumber = "";
          validNumber = false;
        }
      }
    }

    return finalSum;
  }

  getAllNumberDataFromMap(input: string): MapNumberData[] {

    const finalData: MapNumberData[] = [];
    input = input.trimEnd();

    const inputLines = input.split("\n");
    for(let y = 0; y < inputLines.length; y++){

      let currentNumber: string = "";
      let startPos: Coordinate = {x: 0, y: 0};
      for (let x = 0; x <= inputLines[y].length; x++) {
        const currentChar = inputLines[y][x];
        const possibleNumber = Number(currentChar);
        if (!isNaN(possibleNumber) && x !== inputLines[y].length-1) {
          if (currentNumber === "") {
            startPos = {x: x, y: y};
          }
          currentNumber = currentNumber + currentChar;
        }
        else if (currentNumber !== "" || x === inputLines[y].length-1)  {

          if (x === inputLines[y].length-1) {
            if (isNaN(possibleNumber)) {continue}
            currentNumber = currentNumber + currentChar;
          }

          // edge case that's wrong but doesn't affect answer: line ending in a a single dot after a number
          // like "....857.", the number is saved with the a range of 4 spots instead of 3
          finalData.push( {
            number: Number(currentNumber),
            xRange: [startPos.x, x === inputLines[y].length-1 ? x : x - 1], // if end of line, use x instead of x - 1
            y: y,
          });

          //console.log("Found number:", finalData[finalData.length-1]);

          currentNumber = "";
        }
      }

    }

    return finalData;
  }

  calcFinalPart2Sum(input: string, numbersMap: MapNumberData[], ): number {

    let finalSum = 0;

    const inputLines = input.trimEnd().split("\n");
    for(let y = 0; y < inputLines.length; y++){

      for (let x = 0; x <= inputLines[y].length; x++) {

        let numbersDataCheckSet = new Set<MapNumberData>();

        if (inputLines[y][x] === "*") {
          console.log("Found * at:", x, y);

          for (let yOffset of [-1, 0, 1]) {
            for (let xOffset of [-1, 0, 1]) {
              if (yOffset === 0 && xOffset === 0) continue;

              const foundNumber = this.allNumberData.find( number => {
                for (let xrange of number.xRange) {
                  if (xrange === (x + xOffset) && number.y === (y + yOffset)) {
                    return true;
                  }
                }
                return false;
              } );

              if (foundNumber) {
                numbersDataCheckSet.add(foundNumber);
              }
            }
          }

          console.log("Numbers surrounding that *:", numbersDataCheckSet);

          if (numbersDataCheckSet.size === 2) {
            const valuesButInArray: number[] = [];
            for (let value of numbersDataCheckSet.values()){
              valuesButInArray.push(value.number);
            }
            const gearRatio = valuesButInArray[0] * valuesButInArray[1]
            finalSum += gearRatio;
            console.log("Set of 2 detected, adding gear ratio:", gearRatio);
            console.log("Accum:", finalSum);
          }

        }

      }

    }

    return finalSum;
  }

}
