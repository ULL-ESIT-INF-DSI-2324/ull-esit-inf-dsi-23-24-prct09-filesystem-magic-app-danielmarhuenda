
//Negativos para no tener problemas en el coste diferenciar el enum de ints reales
export enum Color{
    Blanco = -7,
    Negro,
    Rojo,
    Azul,
    Verde,
    Incoloro,
    //Para el color de carta
    Multicolor,
}

export enum TipoCarta{
    Tierra,
    Criatura,
    Encantamiento,
    Conjuro,
    Instantáneo,
    Artefacto,
    Planeswalker,
    //Legendario es tipo secundario frecuente, ´
    //Tribal es tipo secundario en desuso
    //Batalla es el tipo más nuevo
    Legendario,
    Tribal,
    Batalla,
    
}

export enum Rareza{
    Común,
    Infrecuente,
    Raro,
    Mítico,
}

//No la hago clase abstracta porque instantáneo y Conjuro usan la clase base
export class Carta {
    /*
    //Ejemplo, [2, Azul, Azul, Verde]
    coste:(number|Color)[];

    //Ejemplo: Helios: Criatura encantamiento legendaria
    tipo:TipoCarta[];
    */
   color:Color;
    constructor(public id:number, public nombre:string, public coste:(number|Color)[], 
    public tipo:TipoCarta[], public rareza:Rareza, 
    public reglas:string, public mercado:number){
        this.color = Color.Incoloro;

        for(var i of coste){
            //Ejemplo: i=Verde, color=Azul => color=Multicolor
            if(this.color != Color.Incoloro && this.color != i){
                this.color = Color.Multicolor;
            
            //Ejemplo: i=Verde, color=Incoloro => color=Azul
            //Ejemplo: i=Verde, color=Verde => color=Verde
            }else{
                this.color = i;
            }
        }
    }
}