

export abstract class FiltradosBase{

    constructor(protected lista:number[]) {}

    public GetLista():number[]{return this.lista;}


    /**
     * Función que recibe una función a comprobar para cada elemento de la lista y deja sólo a los que la cumplen
     * @param fn Función booleana a comprobar
     */
    public Filtrado(fn:(numero:number) => boolean){
        let listafilter:number[] = [];

        for(var i of this.lista){
            if(fn(i) == true){
                listafilter.push(i);
            }
        }

        this.lista = listafilter;
    }
    

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

    /**
     * Función a implementar por las clases hijas para juntar todos los valores en uno sólo
     */
    public abstract Reducir():void;

    /**
     * Algoritmo para filtrar por función, eliminar repetidos, y juntar en un sólo valor
     * @param fn Función a usar en el filtrado
     * @returns Valor restante del algoritmo
     */
    public FiltrarMapearReducir(fn:(numero:number) => boolean):number{
        this.Filtrado(fn);
        this.Mapeado();
        this.Reducir();
        return this.lista[0];
    }
}


export class FilterMapAddReduce extends FiltradosBase{

    /**
     * Suma los valores restantes
     */
    public Reducir(): void {
        let suma:number = 0;
        for(var i of this.lista){
            suma += i;
        }
        this.lista = [suma];
    }
}
export class FilterMapProdReduce extends FiltradosBase{

    /**
     * Multiplica los valores restantes
     */
    public Reducir(): void {
        let suma:number = 0;
        for(var i of this.lista){
            suma *= i;
        }
        this.lista = [suma];
    }
}


export class FilterMapSubReduce extends FiltradosBase{

    /**
     * Resta los valores restantes, toma el primero como positivo y los demás los resta
     */
    public Reducir(): void {
        let resta:number = this.lista[0];

        for(let i = 1; i < this.lista.length; i++){
            resta -= this.lista[i];
        }

        this.lista = [resta];
    }
}

export class FilterMapDivReduce extends FiltradosBase{

    public Reducir(): void {
        let resta:number = this.lista[0];

        for(let i = 1; i < this.lista.length; i++){
            resta /= this.lista[i];
        }

        this.lista = [resta];
    }
}