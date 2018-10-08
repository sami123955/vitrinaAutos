import { Component, OnInit } from '@angular/core';
import { Autos } from '../models/autos';

@Component({
  selector: 'comparar-autos',
  styleUrls: ['../views/CompararAutos.css'],
  templateUrl: '../views/CompararAutos.html',
  providers: [Autos]
})

export class CompararAutos {

  constructor(
    private autos: Autos
  ){}

  public datos = null;
  public agrear_autos = true;

  public autos_agregados = [];
  public comparar_autos = false;
  public atributos = [];

  //Consultamos al entrar en la pagina los datos
  ngOnInit() {
    //Consultamos los datos
    this.autos.getJSON().subscribe(
      data => {
        this.datos = data;

        console.log('Datos', this.datos);
      },
      error => console.log(error));
  }

  //Metodo que agrega una nueva caja de comparativa de auto
  agregarAuto(){

    //En caso de que ya se estuviera comparando otros autos, desactivamos la tabla
    this.comparar_autos = false;
    this.autos_agregados.push(this.datos);
    //En caso de que ya estén agregados los tres autos, desactivamos la opción para agregar más
    if(this.autos_agregados.length == 3){
      this.agrear_autos = false;
    }
  }


  //Metodo que se ejecuta con la función change del select de la marca, para consultar los autos según la marca seleccionada
  consultarAutosPorMarca(indiceObj, event){

    event.stopPropagation();

    let marca = event.target.value;

    //Agregamos los autos asociados a la marca
    let autos_agregados = this.autos_agregados;
    autos_agregados[indiceObj] = {};

    var tmp = {};

    var i = 0;

    for(let item of this.autos_agregados){
        //Si la posición coincide con la que viene de la vista los agregamos a la variable temporal
        if(i == indiceObj){
            tmp = item;
            tmp['marca_seleccionada'] = marca;
            tmp['marcas'] = this.datos.marcas;
            tmp['autos_marca'] = this.datos.marcas[marca].autos
            autos_agregados[indiceObj] = tmp;
            //Detenemos la iteración debido a que ya se encontró la posición que buscamos
            break;
        }
        i++;
    }
  }


  //Metodo asociado a la función change del select de auto, usado para almacenar el auto que se seleccionó
  seleccionarAuto(indiceObj, auto){
    //Validamos que no se la opción por defecto
    if(auto != ''){
      this.autos_agregados[indiceObj]['auto_seleccionado'] = this.autos_agregados[indiceObj]['autos_marca'][auto];
      //Obtenemos los atributos del carro, para una carga dinamica
      if(this.atributos.length == 0){
        this.atributos = Object.keys(this.autos_agregados[indiceObj]['auto_seleccionado']);
      }
    }

  }

  //Comparar auto
  compararAutos() {

    //Para realizar la comparativa, debe haber minimos dos registros
    if(this.autos_agregados.length < 2){
      alert('Debe agregar minimo dos autos antes de realizar la comparativa');
      return;
    }

    for(let item of this.autos_agregados){
      if(!item.auto_seleccionado){
        alert('Debe seleccionar todos los auto antes de realizar la comparativa');
        return;
      }
    }
    this.comparar_autos = true;
  }

  removerAuto() {
    //Removemos la ultima caja
    this.autos_agregados.splice(this.autos_agregados.length - 1, 1);
  }
}
