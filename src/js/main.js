// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import Alert from 'bootstrap/js/dist/alert';

// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';

//Se importan las funciones de api.js
import { agregarCancion, traerCancionesFavoritas } from "./api.js";

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

//Funcion para validar si el checkbox está marcado y retornar respuesta
function validarCheckbox() {
    if (favoriteCheckbox.checked) {
        return true
    } else {
        return false
    }
}

//Se le agrega un escuchador de eventos al formulario
formulario.addEventListener('submit', async (event) => {
    event.preventDefault()
    let favorite = validarCheckbox()
    
    if (!form.checkValidity()) {
        // Añadir clases de Bootstrap para mostrar mensajes de error
        form.classList.add('was-validated');
        return;
    }
    //Se obtienen los valores de los inputs y se asignan a las keys del json
    const newSong = {
        song: song.value.toLowerCase(),
        artista: artista.value.toLowerCase(),
        categoria: categoria.value,
        genero: genero.value.toLowerCase(),
        songLink: songLink.value,
        songImgLink: songImgLink.value,
        favorite: favorite,
    }
    await agregarCancion(newSong)
    alert("Canción agregada")
    formulario.reset()
    location.reload()
})

//Sección favoritas
//Traemos los elementos que necesitamos

const favoritesCardsContainer = document.querySelector('#favorite-cards')

//Se crea un array de las canciones favoritas con la función que las trae

const listaFavoritas = await traerCancionesFavoritas()
console.log(listaFavoritas)


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
                    <button type="button" class="btn btn-outline-warning">Editar</button>
                    <button type="button" class="btn btn-outline-danger">Eliminar</button>
                </div>
                <a class="text-decoration-none text-success cards-link" href=${cancion.songLink} target="_blank" rel="noopener noreferrer">¡Escuchala!</a>
            </div>
        </div>
    </div>
</div>
`
})