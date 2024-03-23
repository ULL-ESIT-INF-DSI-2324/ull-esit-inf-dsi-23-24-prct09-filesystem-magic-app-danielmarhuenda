import 'mocha';
import { expect } from 'chai';
import { FilterMapAddReduce, FilterMapSubReduce, FilterMapDivReduce, FilterMapProdReduce } from '../../src/PE/filtrado.js';

let filtermap:FilterMapAddReduce = new FilterMapAddReduce([1, 1, 1, 2, 3, 3, 4, 5]);

function filtro(numero:number):boolean{
    return (numero < 4);
}

describe("Prueba Filter", () => {
    it("Lo filtra", () => {
        filtermap.Filtrado(filtro);
        expect(filtermap.GetLista()).to.deep.equal([1, 1, 1, 2, 3, 3]);
    });
});

describe("Prueba Mapa", () => {
    it("Lo mapea", () => {
        filtermap.Mapeado();
        expect(filtermap.GetLista()).to.deep.equal([1, 2, 3]);
    });
});

let suma:FilterMapAddReduce = new FilterMapAddReduce([1, 1, 1, 2, 3, 3, 4, 5]);
describe("Prueba Add", () => {
    it("Lo suma", () => {
        suma.FiltrarMapearReducir(filtro)
        expect(suma.GetLista()).to.deep.equal([6]);
    });
});

let resta:FilterMapSubReduce = new FilterMapSubReduce([3, 3, 3, 1, 1, 4, 5]);
describe("Prueba Sub", () => {
    it("Lo suma", () => {
        resta.FiltrarMapearReducir(filtro)
        expect(resta.GetLista()).to.deep.equal([2]);
    });
});

let multi:FilterMapProdReduce = new FilterMapProdReduce([3, 1, 4, 5, 0]);
describe("Prueba Prod", () => {
    it("Lo multiplica", () => {
        multi.FiltrarMapearReducir(filtro)
        expect(multi.GetLista()).to.deep.equal([0]);
    });
});

let divi:FilterMapDivReduce = new FilterMapDivReduce([3, 2, 4, 5]);
describe("Prueba Prod", () => {
    it("Lo multiplica", () => {
        divi.FiltrarMapearReducir(filtro)
        expect(divi.GetLista()).to.deep.equal([1.5]);
    });
});