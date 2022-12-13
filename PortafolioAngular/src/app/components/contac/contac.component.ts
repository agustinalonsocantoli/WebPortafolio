import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contac',
  templateUrl: './contac.component.html',
  styleUrls: ['./contac.component.css']
})
export class ContacComponent implements OnInit {
  public title: string;
  public contacto!: string;
  public fechaHora: boolean;

  constructor() {
    this.title = 'Formulario de Contacto';
    this.fechaHora = false;
  }

  ngOnInit(): void {
  }

  setContacto(valueS: string, valueB: boolean) {
    this.contacto = valueS;
    this.fechaHora = valueB;
  }

}
