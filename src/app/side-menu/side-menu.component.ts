import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {


  readonly menus = [
    {
      id: "q1",
      title: "Day 1",
      routeNumber: 1
    },
    {
      id: "q2",
      title: "Day 2",
      routeNumber: 2
    },
    {
      id: "q3",
      title: "Day 3",
      routeNumber: 3
    },
    {
      id: "q4",
      title: "Day 4",
      routeNumber: 4
    },
  ]

  constructor(private router: Router) {}

  goToQuestion(link: string) {
    this.router.navigate([link]);
  }

}
