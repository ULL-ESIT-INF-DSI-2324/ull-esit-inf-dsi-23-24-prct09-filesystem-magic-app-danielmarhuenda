import { Carta, ColorCarta, TipoCarta, Rareza } from "./carta.js";

import chalk from "chalk";

export class CartaCriatura extends Carta{

    //Añade subtipo [Caballero, Goblin]
    //Añade fuerza/Resistencia [3, 4]
    constructor(id:number, nombre:string, coste:(number|ColorCarta)[], tipo:TipoCarta[], 
    rareza:Rareza, texto:string, mercado:number, public subtipo:string[], public stats:[number, number]){
        super(id, nombre, coste, tipo, rareza, texto, mercado);
    }

    Imprimir(): void {
        this.ImprimirBase();
        console.log(chalk.green("Subtipos: " + this.subtipo));
        console.log(chalk.green("Fuerza/Resistencia: " + this.stats));
    }
}

export class CartaPlaneswalkerBatalla extends Carta{
    //Batalla y Planeswalker añaden lo mismo
    //Añade subtipo ("Jace"), ("Asedio")
    //Añade contadores de lealtad o de defensa
    constructor(id:number, nombre:string, coste:(number|ColorCarta)[], tipo:TipoCarta[], 
    rareza:Rareza, texto:string, mercado:number, public subtipo:string, public puntos:number){
        super(id, nombre, coste, tipo, rareza, texto, mercado);
    }
    Imprimir(): void {
        this.ImprimirBase();
        console.log(chalk.green("Subtipos: " + this.subtipo));
        console.log(chalk.green("Puntos: " + this.puntos));
    }
}

export class CartaArtefactoEncantamientoTierra extends Carta{
    //Artefacto y Encantamiento y Tierra añaden lo mismo
    //Añade subtipo ("Equipamiento"), ("Aura"), ("Portal")
    //ImprimirBase se encarga de ignorar el coste de maná de la tierra
    //Todas las tierras son incoloras así que no hay problema en eso
    
    constructor(id:number, nombre:string, coste:(number|ColorCarta)[], tipo:TipoCarta[], 
    rareza:Rareza, texto:string, mercado:number, public subtipo:string){
        super(id, nombre, coste, tipo, rareza, texto, mercado);
    }
    Imprimir(): void {
        this.ImprimirBase();
        if(this.subtipo != "") console.log(chalk.green("Subtipos: " + this.subtipo));
    }
}
