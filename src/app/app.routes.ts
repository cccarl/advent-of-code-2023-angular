import { Routes } from '@angular/router';
import { ProblemContainerComponent } from './problem-container/problem-container.component';

export const routes: Routes = [
  {
    title: "Advent Problem??",
    path: "problem/:number",
    component: ProblemContainerComponent
  },
];
