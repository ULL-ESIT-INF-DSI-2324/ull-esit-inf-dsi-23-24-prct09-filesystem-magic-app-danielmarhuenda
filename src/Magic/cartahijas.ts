import { Carta, ColorCarta, TipoCarta, Rareza } from "./carta.js";

import chalk from "chalk";

/**
 * Constructor del tipo criatura
 * Añade subtipo [Caballero, Goblin]
 * Añade fuerza/Resistencia [3, 4]
 */
export class CartaCriatura extends Carta{
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

/**
 * Constructor de los tipos PlanesWalker y Batalla
 * Añaden subtipo ("Jace"), ("Asedio")
 * Añaden contadores de lealtad o de defensa
 */
export class CartaPlaneswalkerBatalla extends Carta{
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

/**
 * Constructor de los demás tipos
 * Pueden tener subtipos pero no es obligatorio
 * ImprimirBase se encarga de no imprimir el coste de maná si es tierra
 * Todas las tierras son incoloras así que no hay problema de coste->color
 * Instantáneos y conjuros pueden tener subtipo si son tribales, trampas, arcanos...
 */
export class CartaResto extends Carta{
    constructor(id:number, nombre:string, coste:(number|ColorCarta)[], tipo:TipoCarta[], 
    rareza:Rareza, texto:string, mercado:number, public subtipo:string){
        super(id, nombre, coste, tipo, rareza, texto, mercado);
    }
    Imprimir(): void {
        this.ImprimirBase();
        if(this.subtipo != "") console.log(chalk.green("Subtipos: " + this.subtipo));
    }
}
