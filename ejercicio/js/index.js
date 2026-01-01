import { LocalStorage } from '../Clases/LocalStorage.js'
import { FabricaArticulos } from '../Clases/Article.js'

//Instancias

const localStore = new LocalStorage('listaCompra')
const fabricaArticulos = new FabricaArticulos()

//Estado

const listaArticulos = []

//Elementos del DOM

const formulario = document.getElementById('formulario')
const inputArticulo = document.getElementById('articulo')
const botonAnadir = document.getElementById('botonAnadir')
const botonNuevaLista = document.getElementById('nuevaLista')
const listaDesordenada = document.getElementById('listaCompra')

//Inicializacion

document.addEventListener('DOMContentLoaded', init)

function init(){
     
    setUpState()
    setUpEvents()
    renderLista()
}


//SEtUpState

function setUpState(){

    const data = localStore.getItem()
    listaArticulos.push(...data)

}

//setUpEvents

function setUpEvents(){

    formulario.addEventListener('submit', onSubmitFormulario)
    botonNuevaLista.addEventListener('click', onNuevaListaClick)
    listaDesordenada.addEventListener('click', onListaClick)

}

function onSubmitFormulario(e){
    e.preventDefault()

    const nombreArticulo = inputArticulo.value.trim()

    if(nombreArticulo !== '' ){
        addArticulo(nombreArticulo)
        inputArticulo.value = ''
        renderLista()
    }
}

function onNuevaListaClick(e){
    e.preventDefault()
     clearLista()
     renderLista()
}

function onListaClick(e){

  const action = e.target.dataset.action
  if(!action) return

  const li = e.target.closest('li')
  if(!li) return

  const id = Number(li.dataset.id)

  if(action === 'delete'){
    removeArticulo(id)
  }

  if(action === 'toggle'){
    toggleComprado(id)
  }

    renderLista()
}
//addArticulo(nombre)

function addArticulo(nombre){
    const articulo = fabricaArticulos.createArticulo(nombre)
    listaArticulos.push(articulo)
    localStore.setItem(listaArticulos)
    return articulo
}

//removeArticulo(id)

function removeArticulo(id){
    const index = listaArticulos.findIndex(articulo => articulo.id === id)
    if(index !== -1){
        listaArticulos.splice(index, 1)
        localStore.setItem(listaArticulos)
    }
}

// toggleComprado(id)

function toggleComprado(id){
    const articulo = listaArticulos.find(articulo => articulo.id === id)
    if(articulo){
        articulo.comprado = !articulo.comprado
        localStore.setItem(listaArticulos)
    }
}

// clearLista()

function clearLista(){
    listaArticulos.length = 0
    localStore.clear()
}


//Renderizado

function renderLista(){

    listaDesordenada.innerHTML = ''
    
    listaArticulos.forEach(articulo =>{
        const li = document.createElement('li')
        li.dataset.id = articulo.id
        listaDesordenada.appendChild(li)

        //Texto 

        const span = document.createElement('span')
        span.textContent = articulo.nombre
        li.appendChild(span)

        //CheckBox
        
        const checkBox = document.createElement('input')
        checkBox.type = 'checkbox'
        checkBox.checked = articulo.comprado 
        checkBox.dataset.action = 'toggle'
        li.appendChild(checkBox)

        //BotonBorrar
    
        const botonBorrar = document.createElement('button')
        botonBorrar.textContent = 'Borrar'
        botonBorrar.dataset.action = 'delete'
        li.appendChild(botonBorrar)  

        //Estado visual

        if(articulo.comprado){
            li.classList.add('comprado')
        }
    })
}