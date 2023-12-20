import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const numbersMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

@Component({
  selector: 'app-p01',
  standalone: true,
  imports: [],
  templateUrl: './p01.component.html',
  styleUrl: './p01.component.css',
})
export class P01Component {

  input: string | undefined;
  part1LinesCal: number[] = [];
  part1finalSum: number = 0;

  part2LinesCal: number[] = [];
  part2finalSum: number = 0;

  constructor(private httpClient: HttpClient) {

    this.httpClient.get("assets/inputs/p01.txt", {responseType: 'text'}).subscribe(
      data => {
        this.input = data;
        this.part1finalSum = this.calculateTheCodeCalibration(this.input, false);
        this.part2finalSum = this.calculateTheCodeCalibration(this.input, true);
      }
    )

  }

  // part 1
  calculateTheCodeCalibration(input: string, considerWords: boolean): number {
    for (let line of input.split("\n")) {
      let foundNumber = false;
      let calibrationInLine = "";
      for (let i = 0; i < line.length && !foundNumber; i++) {

        // part 2 right here
        let possibleWordNumber: undefined | string;
        if (considerWords) {
          for (const key in numbersMap){
            if (line.startsWith(key, i)) {
              possibleWordNumber = numbersMap[key as keyof typeof numbersMap];
              break;
            }
          }
        }

        const possibleNumber = Number(line[i]);

        if (isNaN(possibleNumber) && !possibleWordNumber) {
          continue;
        }

        if (possibleWordNumber){
          console.log(possibleWordNumber);
          calibrationInLine = calibrationInLine + possibleWordNumber;
        }
        if (!isNaN(possibleNumber)){
          console.log(possibleNumber);
          calibrationInLine = calibrationInLine + line[i];
        }

        foundNumber = true;
      }

      foundNumber = false;
      for (let i = line.length - 1; i >= 0 && !foundNumber; i--) {

        // part 2 right here
        let possibleWordNumber: undefined | string;
        if (considerWords) {
          for (const key in numbersMap){
            if (line.startsWith(key, i)) {
              possibleWordNumber = numbersMap[key as keyof typeof numbersMap];
              break;
            }
          }
        }

        const possibleNumber = Number(line[i]);

        if (isNaN(possibleNumber) && !possibleWordNumber) {
          continue;
        }

        if (possibleWordNumber){
          console.log(possibleWordNumber);
          calibrationInLine = calibrationInLine + possibleWordNumber;
        }
        if (!isNaN(possibleNumber)){
          console.log(possibleNumber);
          calibrationInLine = calibrationInLine + line[i];
        }

        foundNumber = true;
      }

      // ugly side effect but lazy
      if (!considerWords) {
        this.part1LinesCal.push(Number(calibrationInLine));
      } else {
        this.part2LinesCal.push(Number(calibrationInLine));
      }

    }
    if (!considerWords) {
      return this.part1LinesCal.reduce((pre, curr) => { return pre + curr });
    } else {
      return this.part2LinesCal.reduce((pre, curr) => { return pre + curr });
    }

  }

}
