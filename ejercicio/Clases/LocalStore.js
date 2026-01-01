

 export class LocalStorage {

    #name
   

    constructor(name){
        this.#name = name;
    }

    getItem(){
        return JSON.parse(localStorage.getItem(this.#name)) || []
    }

    setItem(item){

        localStorage.setItem(this.#name, JSON.stringify(item))

    }

    clear(){
        localStorage.removeItem(this.#name)
    }

}



