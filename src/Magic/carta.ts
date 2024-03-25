import chalk from "chalk";

/*
Poner si me sobra tiempo para imprimir colores correctos
export enum ColorImprimir{
    Común = 'white',
    Infrecuente = 'grey',
    Raro = 'yellow',
    Mítico = 'orange',
    Blanco = 'white',
    Negro = 'black',
    Rojo = 'red',
    Azul = 'blue',
    Verde = 'green',
    Incoloro = 'grey',
    //Para el color de carta
    Multicolor = 'yellow',
}
*/

export enum ColorCarta{
    Blanco = 'blanco',
    Negro = 'negro',
    Rojo = 'rojo',
    Azul = 'azul',
    Verde = 'verde',
    Incoloro = 'incoloro',
    //Para el color de carta
    Multicolor = 'multicolor',
}

export enum TipoCarta{
    Tierra = 'tierra',
    Criatura = 'criatura',
    Encantamiento = 'encantamiento',
    Conjuro = 'conjuro',
    Instantaneo = 'instantaneo',
    Artefacto = 'artefacto',
    Planeswalker = 'planeswalker',
    //Legendario es tipo secundario frecuente, ´
    //Tribal es tipo secundario en desuso
    //Batalla es el tipo más nuevo
    Legendario = 'legendario',
    Tribal = 'tribal',
    Batalla = 'batalla',
    
}

export enum Rareza{
    Comun = 'comun',
    Infrecuente = 'infrecuente',
    Raro = 'raro',
    Mítico = 'mitico',
}

//No la hago clase abstracta porque Tierra, Instantáneo y Conjuro usan la clase base
export class Carta {
    /*
    //Ejemplo, [2, Azul, Azul, Verde]
    coste:(number|Color)[];

    //Ejemplo: Helios: Criatura encantamiento legendaria
    tipo:TipoCarta[];
    */
   color:ColorCarta;
    constructor(protected id:number, protected nombre:string, protected coste:(number|ColorCarta)[], 
    protected tipo:TipoCarta[], protected rareza:Rareza, 
    protected texto:string, protected mercado:number){
        this.color = ColorCarta.Incoloro;

        for(var i of coste){
            //Número no afecta al color
            if(typeof i !== 'number'){

            //Ejemplo: i=Verde, color=Azul => color=Multicolor
            if(this.color != ColorCarta.Incoloro && this.color != i){
                this.color = ColorCarta.Multicolor;
            
            //Ejemplo: i=Verde, color=Incoloro => color=Azul
            //Ejemplo: i=Verde, color=Verde => color=Verde
            }else{
                this.color = i;
            }
        }
        }
    }

    public getID():number{return this.id};

    

    //Para no repertirlos en las clases hijas, llaman a esta y después añaden lo propio
    protected ImprimirBase():void{
        console.log(chalk.green("ID: " + this.id));
        console.log(chalk.green("Nombre: " + this.nombre));
        console.log(chalk.green("Tipo: " + this.tipo));

        if(this.tipo[0] != TipoCarta.Tierra){
            console.log(chalk.green("Coste: " + this.coste));
            console.log(chalk.green("Color: " + this.color));
        }
        
        console.log(chalk.green("Rareza: " + this.rareza));
        console.log(chalk.green("Valor mercado: " + this.mercado  + "€"));
    }

    Imprimir():void{
        this.ImprimirBase();
    }
}