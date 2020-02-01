import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  interpolation: ["((","))"]
})
export class LandingComponent implements OnInit {

  name = 'Your';

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Home');
  }

}
