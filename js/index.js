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

//addArticulo(nombre)

function addArticulo(nombre){
    const articulo = fabricaArticulos.createArticulo(nombre)
    listaArticulos.push(articulo)
    return articulo
}

//removeArticulo(id)

function removeArticulo(id){
    const index = listaArticulos.findIndex(articulo => articulo.id === id)
    if(index !== -1){
        listaArticulos.splice(index, 1)
    }
}

// toggleComprado(id)

function toggleComprado(id){
    const articulo = listaArticulos.find(articulo => articulo.id === id)
    if(articulo){
        articulo.comprado = !articulo.comprado
    }
}

// clearLista()

function clearLista(){
    listaArticulos.length = 0
}

//Elementos del DOM

const formulario = document.getElementById('formulario')
const inputArticulo = document.getElementById('articulo')
const botonAnadir = document.getElementById('botonAnadir')
const botonNuevaLista = document.getElementById('nuevaLista')
const listaDesordenada = document.getElementById('listaCompra')


//Renderizado

function renderLista(){

    listaDesordenada.innerHTML = ''
    
    listaArticulos.forEach(articulo =>{
        const li = document.createElement('li')
        li.textContent = articulo.nombre
        li.dataset.id = articulo.id
        listaDesordenada.appendChild(li)

        const botonBorrar = document.createElement('button')
        botonBorrar.textContent = 'Borrar'
        li.appendChild(botonBorrar)

        const checkBox = document.createElement('input')
        checkBox.type = 'checkbox'
        li.appendChild(checkBox)

    })
}