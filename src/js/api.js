//se crea una constante con el endpoint en el json-server
const API = "http://localhost:3000/songs"
export async function agregarCancion(newSong) {
    await fetch(API, {
        method: "POST",
        body: JSON.stringify(newSong),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

//Creamos una función que trae solo las canciones favoritas 
export async function traerCancionesFavoritas() {
    const response = await fetch(`${API}?favorite=true`)
    const data = await response.json()
    return data
}

//Creamos función para traer todos los generos

export async function traerGeneros() {
    const response = await fetch(`${API}`)
    const data = await response.json()
    const listaGeneros = []
    data.forEach(cancion => {
        if (!listaGeneros.includes(cancion.genero)) {
            return listaGeneros.push(cancion.genero)
        }
    })
    return listaGeneros
}

//Creamos función para buscar una canción 
export async function bucarCancion(id) {
    const response = await fetch(`${API}/${id}`)
    const data = await response.json()
    return await data
}

//Creamos función para eliminar canciones
export async function eliminarCancion(id) {
    await fetch(`${API}/${id}`, {
        method: 'DELETE'
    })
}

//Creamos función para editar canciones en el JSON
export async function editarCancion(songToUpdate, songId) {
    await fetch(`${API}/${songId}`, {
        method: 'PUT',
        body: JSON.stringify(songToUpdate),
        headers: {
            "Content-Type": "application/json"
        }
    })
}