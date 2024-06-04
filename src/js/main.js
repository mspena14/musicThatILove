// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert'

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap'

//Se importan las funciones de api.js
import { agregarCancion, traerCancionesFavoritas, bucarCancion, eliminarCancion, editarCancion, traerGeneros } from "./api.js"

//Se importan alertas desde alerts.js

import { confirmacionAlert, eliminarCancionAlert, editarCancionAlert } from "./alerts.js"

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

//Se obtienen los inputs del formulario 
const formulario = document.querySelector("#registration-form")
const song = formulario.querySelector('#song')
const artista = formulario.querySelector('#artist')
const categoria = formulario.querySelector('#categoria')
const genero = formulario.querySelector('#genre')
const songLink = formulario.querySelector('#song-link')
const songImgLink = formulario.querySelector('#song-img-link')
const favoriteCheckbox = formulario.querySelector('#favorite-check')

//se obtienen las secciones de la página
const favoritesCardsContainer = document.querySelector('#favorite-cards')
const generosCardsContainer = document.querySelector('#generos-cards')
//Se obtienen los botones de los generos 
const botonesGenerosContainer = document.querySelector('#botones-generos')
//Asignamos unas variable para saber qué canción se quiere editar dependiendo de su ID
let songId
//Asignamos una variable al genero elegido
let generoElegido

//Se asignagna un boton a cada genero


//funcion para mostrar los generos en la seccion de generos

async function mostrarBotonesGeneros() {
    const generos = await traerGeneros()
    generos.forEach(genero => {
    botonesGenerosContainer.innerHTML += `
    <input type="radio" class="btn-check" name="btnRadio" id="${genero}" autocomplete="off" >
    <label class="btn btn-outline-success text-capitalize" for="${genero}">${genero}</label>
    `
})
}


//Funcion para validar si el checkbox está marcado y retornar respuesta
function validarCheckbox() {
    return favoriteCheckbox.checked;
}

//Se le agrega un escuchador de eventos al formulario
formulario.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!formulario.checkValidity()) {
        // Añadir clases de Bootstrap para mostrar mensajes de error
        formulario.classList.add('was-validated')
        return
    }
    let isFavorite = validarCheckbox()
    //Se crea la validación para que, si la canción se esta editando no cree una nueva sino que solo la modifique
    if (!songId) {
        //Se obtienen los valores de los inputs y se asignan a las keys del json
        const newSong = {
            song: song.value.toLowerCase(),
            artista: artista.value.toLowerCase(),
            categoria: categoria.value,
            genero: genero.value.toLowerCase(),
            songLink: songLink.value,
            songImgLink: songImgLink.value,
            favorite: isFavorite,
        }
        await agregarCancion(newSong)
        confirmacionAlert("¡Canción agregada con éxito!")
        favoritesCardsContainer.innerHTML = ""
        await mostrarCancionesfavoritas()
        formulario.reset()
        formulario.classList.remove('was-validated')
    } else {
        const respuestaEditarALert = await editarCancionAlert()
        if (respuestaEditarALert === true) {
            const songToUpdate = {
                song: song.value.toLowerCase(),
                artista: artista.value.toLowerCase(),
                categoria: categoria.value,
                genero: genero.value.toLowerCase(),
                songLink: songLink.value,
                songImgLink: songImgLink.value,
                favorite: isFavorite,
            }
            await editarCancion(songToUpdate, songId)
            songId = undefined
            favoritesCardsContainer.innerHTML = ""
            await mostrarCancionesfavoritas()
            formulario.reset()
            formulario.classList.remove('was-validated')
        }
    }

})

//Sección favoritas
//Traemos los elementos que necesitamos




//Se crea función para mostrar las cancines favoritas
async function mostrarCancionesfavoritas() {
const listaFavoritas = await traerCancionesFavoritas()
listaFavoritas.forEach(cancion => {
    favoritesCardsContainer.innerHTML += `                    
    <div class="col" id="${cancion.id}">
    <div class="card bg-primary rounded-top-3 shadow">
        <img class="card-img-top rounded-top-3" src=${cancion.songImgLink} width="100%" height="225">  
        <div class="card-body bg-dark text-info rounded-bottom-3">
            <h5 class="card-title text-capitalize">${cancion.song}</h5>
            <h6 class="card-subtitle mb-2 text-body-dark text-capitalize text-info-emphasis">${cancion.artista}</h6>
            <p class="card-text text-capitalize">${cancion.genero}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="">
                <a href="#agregar-cancion-section"><button type="button" class="btn btn-outline-warning" data-id="${cancion.id}">Editar</button></a>
                    <button type="button" class="btn btn-outline-danger" data-id="${cancion.id}">Eliminar</button>
                </div>
                <a class="text-decoration-none text-success cards-link" href=${cancion.songLink} target="_blank" rel="noopener noreferrer">¡Escuchala!</a>
            </div>
        </div>
    </div>
</div>
`
})}

//Traemos el contenedor de las cards del documento para signarle el escuchador de eventos
favoritesCardsContainer.addEventListener('click', async function (event) {

    if (event.target.classList.contains('btn-outline-warning')) {
        songId = event.target.getAttribute("data-id")
        const cancionEncontrada = await bucarCancion(songId)
        song.value = cancionEncontrada.song
        artista.value = cancionEncontrada.artista
        categoria.value = cancionEncontrada.categoria
        genero.value = cancionEncontrada.genero
        songLink.value = cancionEncontrada.songLink
        songImgLink.value = cancionEncontrada.songImgLink
        favoriteCheckbox.checked = cancionEncontrada.favorite
    }

    if (event.target.classList.contains("btn-outline-danger")) {
        songId = event.target.getAttribute("data-id")
        const respuestaAlert = await eliminarCancionAlert()
        if (respuestaAlert === true) {
            await eliminarCancion(songId)
            favoritesCardsContainer.innerHTML = ""
            mostrarCancionesfavoritas()
            songId = null
        } else {
            songId = undefined
        }
    }
})
mostrarBotonesGeneros()
mostrarCancionesfavoritas()
