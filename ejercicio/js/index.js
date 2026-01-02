// @ts-check

/** @import { Articulo } from '../Clases/Article.js' */
import { LocalStorage } from '../Clases/LocalStore.js'
import { FabricaArticulos } from '../Clases/Article.js'

//Instancias

const localStore = new LocalStorage('listaCompra')
const fabricaArticulos = new FabricaArticulos()

//Estado
/** @type {Articulo[]} */
const listaArticulos = []

function getDOMElements(){

    /** @returns {{
     * formulario: HTMLFormElement,
     * inputArticulo: HTMLInputElement,
     * botonAnadir: HTMLButtonElement,
     * botonNuevaLista: HTMLButtonElement,
     * listaDesordenada: HTMLDListElement
     * }} */

    const formulario = document.getElementById('formulario')
    const inputArticulo = document.getElementById('articulo')
    const botonAnadir = document.getElementById('botonAnadir')
    const botonNuevaLista = document.getElementById('nuevaLista')
    const listaDesordenada = document.getElementById('listaCompra')

    if(
        !(formulario instanceof HTMLFormElement) ||
        !(inputArticulo instanceof HTMLInputElement) ||
        !(botonAnadir instanceof HTMLButtonElement) ||
        !(botonNuevaLista instanceof HTMLButtonElement) ||
        !(listaDesordenada instanceof HTMLDListElement)
    ) {
        throw new Error ('No ser han podido obtener los elementos del DOM')
    }

    return {
        formulario,
        inputArticulo,
        botonAnadir,
        botonNuevaLista,
        listaDesordenada
    }}


//Inicializacion


let dom
document.addEventListener('DOMContentLoaded', init)

function init(){

    const DOM = getDOMElements()


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

    dom.formulario.addEventListener('submit', onSubmitFormulario)
    dom.botonNuevaLista?.addEventListener('click', onNuevaListaClick)
    dom.listaDesordenada?.addEventListener('click', onListaClick)

}

/** @param {SubmitEvent} e */
function onSubmitFormulario(e){
    e.preventDefault()

  
    const nombreArticulo = inputArticulo.value.trim()

    if(nombreArticulo !== '' ){
        addArticulo(nombreArticulo)
        inputArticulo.value = ''
        renderLista()
    }
}

/** @param {MouseEvent} e */
function onNuevaListaClick(e){
    e.preventDefault()
     clearLista()
     renderLista()
}

/** @param {MouseEvent} e */
function onListaClick(e){

  const target = /** @type {HTMLElement} */ (e.target)
  if(!target) return

  const action = target.dataset.action
  if(!action) return

  const li = target.closest('li')
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
/** @param {string} nombre  */
function addArticulo(nombre){
    const articulo = fabricaArticulos.createArticulo(nombre)
    listaArticulos.push(articulo)
    localStore.setItem(listaArticulos)
    return articulo
}

//removeArticulo(id)

/** @param {number} id  */
function removeArticulo(id){
    const index = listaArticulos.findIndex(articulo => articulo.id === id)
    if(index !== -1){
        listaArticulos.splice(index, 1)
        localStore.setItem(listaArticulos)
    }
}

// toggleComprado(id)
/** @param {*} id  */
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
        li.dataset.id = String(articulo.id)
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