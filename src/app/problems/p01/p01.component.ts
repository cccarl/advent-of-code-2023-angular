import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-p01',
  standalone: true,
  imports: [],
  templateUrl: './p01.component.html',
  styleUrl: './p01.component.css',
})
export class P01Component {

  input: string | undefined;

  constructor(private httpClient: HttpClient) {

    this.httpClient.get("assets/inputs/p01.txt", {responseType: 'text'}).subscribe(
      data => {
        this.input = data;
        console.log(this.input);
      }
    )

  }

}
