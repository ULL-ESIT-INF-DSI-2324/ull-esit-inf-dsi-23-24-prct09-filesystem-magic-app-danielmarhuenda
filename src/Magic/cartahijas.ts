import { Carta, Color, TipoCarta, Rareza } from "./carta.js";

export class CartaCriatura extends Carta{

    //Añade subtipo [Caballero, Goblin]
    //Añade fuerza/Resistencia [3, 4]
    constructor(id:number, nombre:string, coste:(number|Color)[], tipo:TipoCarta[], 
    rareza:Rareza, reglas:string, mercado:number, public subtipo:string[], public stats:[number, number]){
        super(id, nombre, coste, tipo, rareza, reglas, mercado);
    }
}

export class CartaPlaneswalkerBatalla extends Carta{
    //Batalla y Planeswalker añaden lo mismo
    //Añade subtipo ("Jace"), ("Asedio")
    //Añade contadores de lealtad o de defensa
    constructor(id:number, nombre:string, coste:(number|Color)[], tipo:TipoCarta[], 
    rareza:Rareza, reglas:string, mercado:number, public subtipo:string, public puntos:number){
        super(id, nombre, coste, tipo, rareza, reglas, mercado);
    }
}

export class CartaArtefactoEncantamiento extends Carta{
    //Artefacto y Encantamiento añaden lo mismo
    //Añade subtipo ("Equipamiento"), ("aura")
    constructor(id:number, nombre:string, coste:(number|Color)[], tipo:TipoCarta[], 
    rareza:Rareza, reglas:string, mercado:number, public subtipo:string){
        super(id, nombre, coste, tipo, rareza, reglas, mercado);
    }
}