import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { P01Component } from '../problems/p01/p01.component';
import { P02Component } from '../problems/p02/p02.component';
import { P03Component } from '../problems/p03/p03.component';
import { P04Component } from '../problems/p04/p04.component';
import { P05Component } from '../problems/p05/p05.component';

@Component({
  selector: 'app-problem-container',
  standalone: true,
  imports: [
    P01Component,
    P02Component,
    P03Component,
    P04Component,
    P05Component,
  ],
  templateUrl: './problem-container.component.html',
  styleUrl: './problem-container.component.css'
})
export class ProblemContainerComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  currentQuestion: number | undefined;

  constructor(private router: Router) {
    this.currentQuestion = Number(this.route.snapshot.params["number"]);
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      val => {
        if (val instanceof NavigationEnd) {
          // idk this feels jank but as long as the route doesn't change format it should be fine
          const routeSplit = val.url.split("/");
          this.currentQuestion = Number(routeSplit[routeSplit.length - 1]);
        }
      }
    )
  }


}
