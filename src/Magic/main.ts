import * as fs from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from "chalk";

import { Carta, TipoCarta, ColorCarta, Rareza } from "./carta.js";
import { CartaCriatura, CartaArtefactoEncantamientoTierra, CartaPlaneswalkerBatalla} from "./cartahijas.js"
import { Coleccion } from './coleccion.js';

/*
Orden de construcción de carta:
Preguntar cosas de la clase base (id, nombre, coste, tipo, texto y mercado)
Si su tipo[0] es una calse hija hacerla de ese tipo (ej:Criatura encantamiento usa criatura)
No preguntar coste si es una tierra
Poner parámetros obtenidos en el constructor correspondiente(Base es el else de los else if)
*/

/**
 * Función para pasar el formato de coste de oficial a colores legibles
 * @param coste Coste en formato oficial (1BR)
 * @returns Coste en formato legible(1,Negro,Rojo)
 */
function CosteStringAColorCarta(coste:string):(number|ColorCarta)[]{
  let result:(number|ColorCarta)[] = [];
  let numero:number = 0;
  let auxiliar:string = "";

  for(var i of coste){
    if(i >= '0' && i<='9'){
      if(numero == 0){
        auxiliar = i;
        numero = +auxiliar;
        
      }else{
        auxiliar = auxiliar + i;
        numero = +auxiliar;
      }

    }else{
      //Seguramente podía hacerlo con un for pero me daba errores
      //WWhite, UBlue, BBlack, RRed, GGreen, Código oficial
      if(i == 'W'){
        result.push(ColorCarta.Blanco);
      }else if(i == 'U'){
        result.push(ColorCarta.Azul);
      }else if(i == 'B'){
        result.push(ColorCarta.Negro);
      }else if(i == 'R'){
        result.push(ColorCarta.Rojo);
      }else if(i == 'G'){
        result.push(ColorCarta.Verde);
      }
    }
  }
  result.push(numero);

  return result;
}



yargs(hideBin(process.argv))

  /**
   * Comando añadir
   */
  .command('add', 'Añade una carta a la colleccion', {
  usuario: {
    description: 'Dueño de la coleccion',
    type: 'string',
    demandOption: true
  },    
  id: {
   description: 'Card ID',
   type: 'number',
   demandOption: true
  },
  nombre: {
    description: 'Nombre de la carta',
    type: 'string',
    demandOption: true
  },
  coste: {
    desciption: 'Coste en maná en formato WUBRG, ej: 3WR para 3 genéricos, un blanco y un rojo',
    //2BB como string será más fácil supongo
    type: 'string',
    demandOption: false,
  },
  tipo: {
    desciption: 'Tipos de la carta, orden importa, primero el principal',
    type: 'array',
    choices: ['tierra', 'conjuro', 'instantaneo', 'criatura', 'artefacto', 'encantamiento', 'planeswalker', 'legendario', 'tribal', 'batalla'],
    demandOption: true,
  },
  subtipo: {
    desciption: 'Subtipos de la carta, Goblin, Caballero, Cueva etc',
    type: 'array',
    demandOption: false,
  },
  rareza: {
    desciption: 'Rareza de la carta',
    type: 'string',
    choices: ['comun', 'infrecuente', 'raro', 'mitico'],
    demandOption: true,
  },
  texto: {
    description: "Reglas de la carta",
    type: "string",
    demandOption: true,
  },
  stats: {
    description: "Fuerza y Resistencia de la carta, sólo si es criatura",
    type: "array",
    demandOption: false,
  },
  puntos: {
    description: "Puntos de lealtad o de defensa de la carta, sólo si es Planeswalker o Batalla",
    type: "number",
    demandOption: false,
  },
  mercado: {
    description: "Valor de mercado de la carta",
    type: "number",
    demandOption: true,
  },
  
 }, (argv) => {
  const usuario_ = new Coleccion(argv.usuario);
  let costecolorado:(number|ColorCarta)[] = [];

  if(typeof argv.coste === 'string') costecolorado = CosteStringAColorCarta(argv.coste);

  let carta:Carta;

  if(argv.tipo[0] == TipoCarta.Criatura){
    if(typeof argv.subtipo === 'undefined' || typeof argv.stats === 'undefined'){
      console.log(chalk.red("Las criaturas deben llevar un subtipo y una [fuerza, resistencia]! "));
      process.exit(2);
    }

    carta = new CartaCriatura(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado,
      argv.subtipo as string[],
      argv.stats as [number, number],
    );

  }else if(argv.tipo[0] == TipoCarta.Planeswalker || argv.tipo[0] == TipoCarta.Batalla){
    if(typeof argv.subtipo === 'undefined' || typeof argv.puntos === 'undefined' || typeof argv.subtipo[0] === 'undefined'){
      console.log(chalk.red("Las batallas y los planeswalker deben llevar una puntuación de lealtad o de defensa y un subtipo! "));
      process.exit(2);
    }
    
    carta = new CartaPlaneswalkerBatalla(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado,
      argv.subtipo[0] as string,
      argv.puntos as number,
    );

  }else if(argv.tipo[0] == TipoCarta.Encantamiento || argv.tipo[0] == TipoCarta.Artefacto || argv.tipo[0] == TipoCarta.Tierra){
    //Estos pueden no tener subtipo así que no pongo caso de error por no tener.
    let subtipo:string = "";
    if(typeof argv.subtipo !== 'undefined' && typeof argv.subtipo[0] !== 'undefined'){
      subtipo = argv.subtipo[0] as string;
    }
    carta = new CartaArtefactoEncantamientoTierra(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado,
      subtipo,
    );

  }else{
    carta = new Carta(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado
    );
  }

  usuario_.addCarta(carta);

 })

 /**
  * Comando modificar
  */
 .command('update', 'Modifica una carta de la colleccion', {
  usuario: {
    description: 'Dueño de la coleccion',
    type: 'string',
    demandOption: true
  },    
  id: {
   description: 'Card ID',
   type: 'number',
   demandOption: true
  },
  nombre: {
    description: 'Nombre de la carta',
    type: 'string',
    demandOption: true
  },
  coste: {
    desciption: 'Coste en maná en formato WUBRG, ej: 3WR para 3 genéricos, un blanco y un rojo',
    //2BB como string será más fácil supongo
    type: 'string',
    demandOption: false,
  },
  tipo: {
    desciption: 'Tipos de la carta, orden importa, primero el principal',
    type: 'array',
    choices: ['tierra', 'conjuro', 'instantaneo', 'criatura', 'artefacto', 'encantamiento', 'planeswalker', 'legendario', 'tribal', 'batalla'],
    demandOption: true,
  },
  subtipo: {
    desciption: 'Subtipos de la carta, Goblin, Caballero, Cueva etc',
    type: 'array',
    demandOption: false,
  },
  rareza: {
    desciption: 'Rareza de la carta',
    type: 'string',
    choices: ['comun', 'infrecuente', 'raro', 'mitico'],
    demandOption: true,
  },
  texto: {
    description: "Reglas de la carta",
    type: "string",
    demandOption: true,
  },
  stats: {
    description: "Fuerza y Resistencia de la carta, sólo si es criatura",
    type: "array",
    demandOption: false,
  },
  puntos: {
    description: "Puntos de lealtad o de defensa de la carta, sólo si es Planeswalker o Batalla",
    type: "number",
    demandOption: false,
  },
  mercado: {
    description: "Valor de mercado de la carta",
    type: "number",
    demandOption: true,
  },
  
 }, (argv) => {
  const usuario_ = new Coleccion(argv.usuario);
  let costecolorado:(number|ColorCarta)[] = [];

  if(typeof argv.coste === 'string') costecolorado = CosteStringAColorCarta(argv.coste);

  let carta:Carta;

  if(argv.tipo[0] == TipoCarta.Criatura){
    if(typeof argv.subtipo === 'undefined' || typeof argv.stats === 'undefined'){
      console.log(chalk.red("Las criaturas deben llevar un subtipo y una [fuerza, resistencia]! "));
      process.exit(2);
    }

    carta = new CartaCriatura(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado,
      argv.subtipo as string[],
      argv.stats as [number, number],
    );

  }else if(argv.tipo[0] == TipoCarta.Planeswalker || argv.tipo[0] == TipoCarta.Batalla){
    if(typeof argv.subtipo === 'undefined' || typeof argv.puntos === 'undefined' || typeof argv.subtipo[0] === 'undefined'){
      console.log(chalk.red("Las batallas y los planeswalker deben llevar una puntuación de lealtad o de defensa y un subtipo! "));
      process.exit(2);
    }
    
    carta = new CartaPlaneswalkerBatalla(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado,
      argv.subtipo[0] as string,
      argv.puntos as number,
    );

  }else if(argv.tipo[0] == TipoCarta.Encantamiento || argv.tipo[0] == TipoCarta.Artefacto || argv.tipo[0] == TipoCarta.Tierra){
    //Estos pueden no tener subtipo así que no pongo caso de error por no tener.
    let subtipo:string = "";
    if(typeof argv.subtipo !== 'undefined' && typeof argv.subtipo[0] !== 'undefined'){
      subtipo = argv.subtipo[0] as string;
    }
    carta = new CartaArtefactoEncantamientoTierra(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado,
      subtipo,
    );

  }else{
    carta = new Carta(
      argv.id,
      argv.nombre,
      costecolorado,
      argv.tipo as TipoCarta[],
      argv.rareza as Rareza,
      argv.texto,
      argv.mercado
    );
  }

  usuario_.modCarta(carta);

 })

 /**
  * Comando leer carta específica
  */
 .command('read', 'Lee una carta de la colleccion', {
    usuario: {
      description: 'Dueño de la coleccion',
      type: 'string',
      demandOption: true
    },

    id: {
      description: 'Card ID',
      type: 'number',
      demandOption: true
    },
   }, (argv) => {
    const usuario = new Coleccion(argv.usuario);
    usuario.BuscarCarta(argv.id)

   })

   /**
    * Comando lista
    */
   .command('list', 'Muestra la colección de un usuario', {
    usuario: {
      description: 'Dueño de la coleccion',
      type: 'string',
      demandOption: true
    },

   }, (argv) => {
    const usuario = new Coleccion(argv.usuario);
    usuario.MostrarColeccion();
   })

   /**
    * Comando borrar
    */
   .command('remove', 'Muestra la colección de un usuario', {
    usuario: {
      description: 'Dueño de la coleccion',
      type: 'string',
      demandOption: true
    },
    id: {
      description: 'Card ID',
      type: 'number',
      demandOption: true
    },

   }, (argv) => {
    const usuario = new Coleccion(argv.usuario);
    usuario.quitarCarta(argv.id);
   })



 .help()
 .argv;
