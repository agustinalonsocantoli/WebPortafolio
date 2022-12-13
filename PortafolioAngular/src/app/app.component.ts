import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PortafolioAngular';
  dark = false;

  constructor(@Inject(DOCUMENT) private document: any) {

  }

  darkMode() {
    this.dark = !this.dark;
    this.changeBody()
  }

  changeBody() {
    if(this.dark) {
      this.document.body.classList.remove('bodyLight');
      this.document.body.classList.add('bodyDark');
    } else {
      this.document.body.classList.remove('bodyDark');
      this.document.body.classList.add('bodyLight');
    }
  }
}
