# Practica 7: DSIkea
Daniel Marhuenda Guillén, [alu0101487731@ull.edu.es](https://github.com/danielmarhuenda)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-danielmarhuenda/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-danielmarhuenda?branch=main)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-danielmarhuenda/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct09-filesystem-magic-app-danielmarhuenda/actions/workflows/node.js.yml)


## PE

En la hora de clase se nos pidió crear unas clases según el patrón de comportamiento Templates, donde la clase padre daba el algoritmo a seguir (Filtrar, Mapear y Reducir), y las clases hijas especifican cómo lo aplican, en este caso cómo aplican el reducir.  

Sufrí una confusión al no leer detenidamente el enunciado: al leer "Mapear el contenido" entendí que había que modificarlo para que fuera similar a un mapa, es decir, que las claves fueran únicas, así que realicé una función que elimina las repeticiones:  

```ts
/**
     * Función que elimina valores repetidos en la lista
     */
    public Mapeado(){
        let listamap:number[] = [];
        let encontrado:boolean = false;

        for(var i of this.lista){
            encontrado = false;
            for(var j of listamap){          
                if(i == j) encontrado = true;
            }

            if(encontrado == false){
                listamap.push(i);
            }

        }

        this.lista = listamap;
    } 
```

Ignorando ese problema lo demás lo pude realizar, consiguiendo el coverage de todo el código:  
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------|---------|----------|---------|---------|-------------------
All files    |     100 |      100 |     100 |     100 |                   
 filtrado.ts |     100 |      100 |     100 |     100 |                   
-------------|---------|----------|---------|---------|-------------------

## Cartas Magic 

Para ejecutar este programa se necesita ejecutar el archivo main.js, poner la acción, a las cuales se les llama con las siguientes palabras:  
_add, update, read, list, remove_  

A las opciones de los comandos se les llama con --(palabra):  
_usuario, id, nombre, coste, tipo, subtipo, rareza, texto, stats, puntos, mercado_  

Por si algún nombre genera dudas:  
usuario: string del dueño de la colección.  
id: number del id único de la carta.  
nombre: string del nombre de la carta.  
coste: string del coste de la carta, debe estar en el formato: WURBG, ej: 2U para 2 incoloro y 1 azul.  
tipo: tipo de la carta, deben estar en el orden correcto, en español el primero siempre es el principal.  
subtipo: string del subtipo, como goblin o equipamiento.  
rareza: string de la rareza de la carta.  
texto: string del texto de reglas de la carta.  
stats: array de dos números para la fuerza y la resistencia si es una criatura.  
puntos: number de lealtad o de defensa si es un planeswalker o una batalla respectivamente.  
mercado: number del valor en el mercado de la carta.  

Para añadir o modificar una carta se deben llenar todos estos valores que necesite la carta, para leerla o removerla sólo se necesita el dueño y la id, y para listar un usuario sólamente el usuario a listar.  

Las colecciones se almacenan en la carpeta llamada colecciones.

En el inicio de este ejercicio sufrí dudas sobre cómo organizar las clases, decidí crear una clase padre Carta y clases hijas dependiendo de su tipo de carta.  

La clase Carta contiene los valores obligatorios de las cartas, además de el coste que no es obligatorio, ya que no me parecía correcto hacer que todas las clases hijas añadieran el coste ellas mismas sólo porque las tierras no contienen ningún coste.  

En la clase padre la función ImprimirBase() imprime los valores obligatorios, luego las clases hijas usan la función Imprimir() para llamar a esa misma ImprimirBase() y después añaden lo que consideren necesario dependiendo de su tipo de carta.

Para evitar crear 9 clases hijas lo que hice fue juntar las que añadan los mismos tipos de valores:  

Planeswalker y Batalla añaden un subtipo obligatorio, el nombre o asedio respectivamente, y unos puntos, de lealtad para el planeswalker y de defensa para la batalla, pero se pueden agrupar al funcionar ambos de la misma manera.  

Las Criaturas deben ir separadas de las demás al ser las únicas que contienen el par Fuerza/Resistencia. Además de eso tienen un array de subtipos[Guerrero, Humano], debe ser un array y no una string para poder ser capaz de buscar por ejemplo humanos sin importar el resto de subtipos.    

Tribal y Legendario son tipos secundarios, así que no tienen un constructor para ellos sólos y por eso sólo se comprueba el tipo[0], los casos como [criatura encantamiento] o [criatura artefacto] también usan otro tipo de carta como tipo secundario, el tipo principal siempre se escribe primero [criatura legendaria].  

Los demás tipos de carta pueden añadir un subtipo no obligatorio, como Aura, Equipamiento, Arcano o Cueva. Las tierras no tienen coste, la función ImprimirBase() se encarga de comprobar que la carta es una tierra y no imprimir el coste si es el caso.  

Creé enums para que fuera más cómodo realizar cambios. En vez de  
```ts 
if(argv.tipo[0] == 'criatura')
``` 
Tener  

```ts
if(argv.tipo[0] == TipoCarta.Criatura)
```

Para el input de los costes de las cartas decidí que se insertara un string mediante el formato oficial: WUBRG, siendo por ejemplo 1 Rojo Verde => 1RG.  

En la función CosteStringAColorCarta se recibe una string en dicho formato y devuelve el array de ColorCarta, el enum de los posibles colores, que se usa al enseñar por pantalla para mayor legibilidad de forma rápida.  

El color de la carta no está en ninguno de los constructores porque este es definido únicamente por su coste, por lo que ponerlo en el constructor es información redundante. En el constructor de la clase Carta se comprueba dicho color iterando por el array de coste. Si una carta Cuesta 1 Verde Verde esta carta debe ser verde. Esto puede parecer que daría problemas con las tierras debido a que estas no tienen coste, pero al no tener coste son todas incoloras, el cual es el valor por defecto antes de iterar por el coste vacío en este caso.  

En la clase Coleccion se almacenan los datos de las cartas, al crear se recogen del json y al modificar a Coleccion se modifican los propios json.  

Quería realizar más funciones con los colores del chalk, como que la carta se imprima de su color o que su rareza se imprima del color de su rareza también, pero por falta de tiempo no pude investigar cómo determinar el color a imprimir en ejecución.  

En el archivo main.ts realicé el código del menú de opciones, creando las cartas con los datos recibidos por parámetro.  

Debido a que tanto la opción para añadir cartas como la de modificarlas usan el mismo código para crear una nueva carta, decidí crear una función separada llamada CrearCarta, el único problema que esto trae es que argv es de un tipo que me daba errores al ponerlo como parámetro de la función, online encontré que se supone que argv es de tipo yargs.Arguments, pero al usarlo ocurre el error "Cannot find namespace 'yargs'.", por lo que tomé la decisión de dejarlo de tipo any aunque no es lo correcto.  

Dentro de la función CrearCarta tomo el control de errores, evitar crear criaturas o planeswalkers sin subtipo, pero dejando que en otros tipos sea opcional, y creo la carta a añadir usando el constructor de su tipo correspondiente.

No pude realizar tests al ser funciones que devuelven valores por pantalla, se usaría el booleano para comprobar si llegan al final, pero no puedo comprobar que funcionaron correctamente, sólo que llegaron al final de la función.  

## Conclusión  

Realizar funciones recibiendo parámetros por línea de comandos me ha sido un choque por la gran diferencia que hay respecto a C++, dónde los valores del argv se guardan todos en un simple array por el cual hay que iterar teniendo más control sobre él.

Me ha gustado más cómo se trabaja con los parámetros aquí, debido a que argv contiene integrado en sí mismo las opciones y lo que aceptan, en vez de hacerlo nosotros manualmente.  
 
