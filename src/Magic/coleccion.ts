import { Carta, TipoCarta } from "./carta.js";
import { CartaCriatura, CartaArtefactoEncantamientoTierra, CartaPlaneswalkerBatalla} from "./cartahijas.js"


import chalk from "chalk";
import fs from "fs";

export class Coleccion {

  protected coleccion_: Map<number, Carta>;
  
  constructor(protected usuario:string){
    this.coleccion_ = new Map<number, Carta>(); 
    if(!fs.existsSync("./colecciones/" + usuario)){
      console.log("Creando directorio: " + usuario);
      fs.mkdirSync("./colecciones/" + usuario);
    }

    const ficheros = fs.readdirSync("./colecciones/" + usuario);
    ficheros.forEach((fichero) => {
      const datos = fs.readFileSync("./colecciones/" + usuario + "/" + fichero);
      const carta_unknown = JSON.parse(datos.toString());
      let carta:Carta;
      
      if(carta_unknown.tipo[0] == TipoCarta.Criatura){
        carta = new CartaCriatura(
          carta_unknown.id,
          carta_unknown.nombre,
          carta_unknown.coste,
          carta_unknown.tipo,
          carta_unknown.rareza,
          carta_unknown.texto,
          carta_unknown.mercado,
          carta_unknown.subtipo,
          carta_unknown.stats,
        );
      }else if(carta_unknown.tipo[0] == TipoCarta.Planeswalker || carta_unknown.tipo[0] == TipoCarta.Batalla){
        carta = new CartaPlaneswalkerBatalla(
          carta_unknown.id,
          carta_unknown.nombre,
          carta_unknown.coste,
          carta_unknown.tipo,
          carta_unknown.rareza,
          carta_unknown.texto,
          carta_unknown.mercado,
          carta_unknown.subtipo,
          carta_unknown.puntos,
        );
      }else if(carta_unknown.tipo[0] == TipoCarta.Encantamiento || carta_unknown.tipo[0] == TipoCarta.Artefacto || carta_unknown.tipo[0] == TipoCarta.Tierra){
        carta = new CartaArtefactoEncantamientoTierra(
          carta_unknown.id,
          carta_unknown.nombre,
          carta_unknown.coste,
          carta_unknown.tipo,
          carta_unknown.rareza,
          carta_unknown.texto,
          carta_unknown.mercado,
          carta_unknown.subtipo,
        );
      }else{
        carta = new Carta(
          carta_unknown.id,
          carta_unknown.nombre,
          carta_unknown.coste,
          carta_unknown.tipo,
          carta_unknown.rareza,
          carta_unknown.texto,
          carta_unknown.mercado,
        );
      }
      this.addCarta(carta);

    }); 
  }


  getCarta(id: number): Carta | undefined {
    return this.coleccion_.get(id);
  }

  addCarta(carta: Carta): boolean {
    if(this.coleccion_.has(carta.getID())){
      console.log(chalk.red("Card already exists at " + this.usuario + " collection! "));
      return false;

    } else {
      this.coleccion_.set(carta.getID(), carta);

      const ruta = "./colecciones/" + this.usuario + "/" + carta.getID() + ".json";
      fs.writeFile(ruta, JSON.stringify(carta), (err) => {
        if(err){
          console.log(err);
        }
      });

      console.log(chalk.red("New card added to " + this.usuario + " collection! "));
      return true;
    }
  }

  modCarta(carta: Carta): boolean {
    if(this.coleccion_.has(carta.getID())){
      this.coleccion_.set(carta.getID(), carta);
      console.log(chalk.red("Card updated at " + this.usuario + " collection! "));
      return true;

    } else {
      console.log(chalk.red("Card not found at " + this.usuario + " collection! "));
      return false;
    }
  }

  quitarCarta(id: number): boolean {
    const ruta = "./colecciones/" + this.usuario + "/" + id + ".json";
    if(!this.coleccion_.delete(id)){
      console.log(chalk.red("Card not found at " + this.usuario + " collection! "));
      return false;
    }

  fs.unlink(ruta, (err) => {
    if(err){
      console.log(err);
    }
  });

  return true;
  }

  BuscarCarta(id: number): boolean {
    const carta = this.getCarta(id);
    if(carta){
      carta.Imprimir();
    } else {
      console.log(chalk.red("Card not found at " + this.usuario + " collection! "));
      return false;
    }
    return true;
  }

  MostrarColeccion(): boolean {
    console.log(chalk.green("Colecion de cartas MTG de " + this.usuario));
    this.coleccion_.forEach((carta) => {
      console.log("======================================");
      carta.Imprimir();
    });
    return true;
  }


  forEach(callback: (carta: Carta) => void): void {
    this.coleccion_.forEach((carta) => {
      callback(carta);
    });
  }

}