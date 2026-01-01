//@ts-check

/**
 * @template T
 */

 export class LocalStorage {

    /** @type {string} name */
    #name

   /**  @param {string} name  */
    constructor(name){
        this.#name = name;
    }

    /**  @returns {T[]}  */

    getItem(){
        
        return JSON.parse(localStorage.getItem(this.#name) || '[]')
    }

    /**  @param {T[]} item  */

    setItem(item){

        localStorage.setItem(this.#name, JSON.stringify(item))

    }

    clear(){
        localStorage.removeItem(this.#name)
    }

}



