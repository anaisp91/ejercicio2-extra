// @ts-check

/**
     * @typeof {Object} Articulo
     * @property {number} id
     * @property {string} nombre
     * @property {boolean} comprado
     */

 //Factory de Articulos
 
 export class Articulo {
    
    /**
     * @type {number} id */
    id
    /**
     * @type {string}  */
    nombre
    /**
     * @type {boolean} comprado */
    comprado

    /**
     * 
     * @param {number} id 
     * @param {string} nombre 
     * @param {boolean} [comprado = false]
     */
    

    constructor(id, nombre, comprado = false) {
        this.nombre = nombre
        this.comprado = comprado
        this.id = id
    }
}

 export class FabricaArticulos {
    /**
     * 
     * @param {string} nombre 
     * @returns {Articulo}
     */
    createArticulo(nombre){
        
        const id = Date.now()
        return new Articulo(id, nombre, false)
    }
}

