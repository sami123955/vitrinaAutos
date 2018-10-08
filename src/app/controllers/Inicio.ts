import { Component, OnInit } from '@angular/core';
import { Autos } from '../models/autos';
import { SearchPipe } from './search.pipe';

@Component({
    selector: 'inicio',
    styleUrls: [
      '../views/Inicio.css'
    ],
    templateUrl: '../views/Inicio.html',
    providers: [Autos, SearchPipe]
})

export class Inicio {

  public datos = null;
  public searchText = '';
  public searching = false;

  constructor(
    private autos: Autos,
    private pipe_search: SearchPipe
  ){}

  //Consultamos la informacion al momento de entrar en la pagina para mostrar el listdo completo
  ngOnInit() {
    //Consultamos los datos
    this.autos.getJSON().subscribe(
      data => {
        this.datos = data;
      },
      error => console.log(error));
  }

  //Metodo que se ejecuta con la funcion keyup, consulta los registros por marca
  filtrar() {
    this.autos.getJSON().subscribe(
      data => {
        this.datos.marcas = this.pipe_search.transform(data.marcas, this.searchText);
      },
      error => console.log(error));
  }
}
