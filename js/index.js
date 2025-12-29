//Factory de Articulos

class Articulo {
    
    id
    nombre
    comprado
    

    constructor(id, nombre, comprado = false) {
        this.nombre = nombre
        this.comprado = comprado
        this.id = id
    }
}

class FabricaArticulos {
    createArticulo(nombre){
        const id = Date.now()
        return new Articulo(nombre, id, comprado)
    }
}

const fabricaArticulos = new FabricaArticulos()

//Estado

const listaArticulos = []

//Elementos del DOM
// Inicializacion
//Eventos
//Logica de Negocio
//Renderizado