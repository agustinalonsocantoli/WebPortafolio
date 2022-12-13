import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: String;
  public subtitle: String;
  public darkAbout: boolean;


  constructor() {
    this.title = "Agustin Alonso Cantoli"
    this.subtitle = "Front-End Developer"
    this.darkAbout = false;
  }

  ngOnInit(): void {
  }
}
