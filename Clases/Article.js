
 //Factory de Articulos
 
 export class Articulo {
    
    id
    nombre
    comprado
    

    constructor(id, nombre, comprado = false) {
        this.nombre = nombre
        this.comprado = comprado
        this.id = id
    }
}

 export class FabricaArticulos {
    createArticulo(nombre){
        const id = Date.now()
        return new Articulo(nombre, id, comprado)
    }
}

